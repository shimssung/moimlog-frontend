# 🔐 리프레시 토큰 삭제 가이드

## 📋 개요

MoimLog 프로젝트에서 로그아웃 시 리프레시 토큰을 안전하게 삭제하는 방법을 설명합니다.

**토큰 관리 방식:**

- **액세스 토큰**: 메모리 (Zustand 스토어)에만 저장
- **리프레시 토큰**: HttpOnly 쿠키 (백엔드 관리)

---

## 🔄 현재 구현 상태

### **프론트엔드 로그아웃 요청**

**파일**: `src/stores/useStore.js`

```javascript
// 로그아웃 (API 호출 포함)
logout: async () => {
  try {
    // 백엔드에 로그아웃 요청 (리프레시 토큰 쿠키 삭제)
    await authAPI.logout();

    // API 호출이 성공했을 때만 로컬 상태 초기화
    // 쿠키 삭제 (리프레시 토큰만)
    if (typeof window !== "undefined") {
      document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    // 상태 초기화 (메모리의 액세스 토큰 삭제)
    set({
      user: defaultUser,
      isAuthenticated: false,
      accessToken: null,
    });
  } catch (error) {
    console.error("로그아웃 API 호출 실패:", error);
    // API 호출 실패 시에도 로컬 상태는 초기화
    if (typeof window !== "undefined") {
      document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    set({
      user: defaultUser,
      isAuthenticated: false,
      accessToken: null,
    });
  }
},

// 조용한 로그아웃 (API 호출 없이 상태만 초기화)
logoutSilently: () => {
  // 쿠키 삭제 (리프레시 토큰만)
  if (typeof window !== "undefined") {
    document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  // 상태 초기화 (메모리의 액세스 토큰 삭제)
  set({
    user: defaultUser,
    isAuthenticated: false,
    accessToken: null,
  });
},
```

**파일**: `src/api/auth.js`

```javascript
// 로그아웃
logout: async () => {
  try {
    const response = await axios.post("/auth/logout", {});
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
},
```

### **API 요청 정보**

```http
POST /moimlog/auth/logout
Content-Type: application/json
Authorization: Bearer {accessToken}  # 메모리에서 가져온 토큰
Cookie: refreshToken={refreshToken}  # HttpOnly 쿠키

{}
```

---

## 🎯 백엔드에서 해야 할 작업

### **1. 로그아웃 엔드포인트 구현**

**Spring Boot Controller 예시:**

```java
@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(
            HttpServletRequest request,
            HttpServletResponse response) {

        try {
            // 1. 현재 사용자 인증 확인
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                String username = authentication.getName();

                // 2. 리프레시 토큰 무효화 (선택사항)
                // - 데이터베이스에서 리프레시 토큰 삭제
                // - 블랙리스트에 추가
                refreshTokenService.invalidateRefreshToken(username);
            }

            // 3. 리프레시 토큰 쿠키만 삭제 (액세스 토큰은 메모리에만 저장됨)
            Cookie refreshTokenCookie = new Cookie("refreshToken", null);
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge(0);
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setSecure(false); // 개발환경
            response.addCookie(refreshTokenCookie);

            // 4. 응답 반환
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("success", true);
            responseBody.put("message", "로그아웃이 완료되었습니다.");

            return ResponseEntity.ok(responseBody);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "로그아웃 처리 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
```

### **2. 리프레시 토큰 서비스 구현**

**RefreshTokenService 예시:**

```java
@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public void invalidateRefreshToken(String username) {
        // 사용자의 모든 리프레시 토큰 삭제
        refreshTokenRepository.deleteByUsername(username);
    }

    public void invalidateRefreshToken(String username, String token) {
        // 특정 리프레시 토큰만 삭제
        refreshTokenRepository.deleteByUsernameAndToken(username, token);
    }
}
```

### **3. 보안 설정 업데이트**

**SecurityConfig 예시:**

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/auth/logout").authenticated()
                // 다른 설정들...
            )
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/auth/logout")
            );

        return http.build();
    }
}
```

---

## 🔧 구현 단계

### **1단계: 백엔드 로그아웃 엔드포인트 확인**

현재 백엔드에서 `/auth/logout` 엔드포인트가 제대로 구현되어 있는지 확인:

```bash
# 테스트 요청
curl -X POST http://localhost:8080/moimlog/auth/logout \
  -H "Authorization: Bearer {accessToken}" \
  -H "Cookie: refreshToken={refreshToken}" \
  -v
```

**예상 응답:**

```json
{
  "success": true,
  "message": "로그아웃이 완료되었습니다."
}
```

**예상 헤더:**

```
Set-Cookie: refreshToken=; Path=/; Max-Age=0; HttpOnly
```

### **2단계: 쿠키 삭제 확인**

브라우저 개발자 도구에서 쿠키가 제대로 삭제되는지 확인:

1. **로그인 후**: `refreshToken` 쿠키만 존재 (액세스 토큰은 메모리에만)
2. **로그아웃 후**: `refreshToken` 쿠키 삭제됨
3. **새로고침 후**: 자동 로그인 안됨 (리프레시 토큰이 없으므로)

### **3단계: 리프레시 토큰 무효화 (선택사항)**

보안 강화를 위해 데이터베이스에서도 리프레시 토큰을 삭제:

```sql
-- 사용자의 모든 리프레시 토큰 삭제
DELETE FROM refresh_tokens WHERE username = 'user@example.com';

-- 또는 특정 토큰만 삭제
DELETE FROM refresh_tokens WHERE token = 'specific_refresh_token';
```

---

## 🚨 주의사항

### **1. HttpOnly 쿠키 삭제**

리프레시 토큰이 HttpOnly로 설정되어 있다면, 클라이언트에서 직접 삭제할 수 없습니다. 반드시 백엔드에서 삭제해야 합니다.

```java
// 올바른 쿠키 삭제 방법
Cookie refreshTokenCookie = new Cookie("refreshToken", null);
refreshTokenCookie.setPath("/");
refreshTokenCookie.setMaxAge(0); // 즉시 만료
refreshTokenCookie.setHttpOnly(true);
response.addCookie(refreshTokenCookie);
```

### **2. 액세스 토큰 관리**

액세스 토큰은 메모리에만 저장되므로:

- **페이지 새로고침 시**: 액세스 토큰이 사라짐 → 리프레시 토큰으로 복원
- **브라우저 종료 시**: 액세스 토큰이 사라짐 → 재로그인 필요
- **보안상 이점**: XSS 공격으로부터 더 안전함

### **3. CORS 설정**

로그아웃 요청 시 쿠키가 포함되도록 CORS 설정 확인:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    configuration.setAllowCredentials(true); // 중요!

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### **4. 에러 처리**

백엔드에서 로그아웃 처리 중 오류가 발생해도 클라이언트는 로컬 상태를 초기화해야 합니다:

```javascript
// 프론트엔드 에러 처리
} catch (error) {
  console.error("로그아웃 API 호출 실패:", error);
  // API 실패 시에도 로컬 상태 초기화
  // ...
}
```

---

## ✅ 체크리스트

- [ ] 백엔드 `/auth/logout` 엔드포인트 구현
- [ ] 리프레시 토큰 쿠키 삭제 로직 구현
- [ ] 액세스 토큰은 메모리에서만 관리 (쿠키 설정 안함)
- [ ] 리프레시 토큰 무효화 로직 구현 (선택사항)
- [ ] CORS 설정 확인
- [ ] 에러 처리 구현
- [ ] 테스트: 로그아웃 후 새로고침 시 자동 로그인 안됨

---

## 🧪 테스트 방법

### **1. 로그아웃 테스트**

```bash
# 1. 로그인
curl -X POST http://localhost:8080/moimlog/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# 2. 로그아웃
curl -X POST http://localhost:8080/moimlog/auth/logout \
  -H "Authorization: Bearer {accessToken}" \
  -H "Cookie: refreshToken={refreshToken}"

# 3. 토큰 갱신 시도 (실패해야 함)
curl -X POST http://localhost:8080/moimlog/auth/refresh \
  -H "Cookie: refreshToken={refreshToken}"
```

### **2. 브라우저 테스트**

1. 로그인
2. 개발자 도구 → Application → Cookies 확인 (`refreshToken`만 존재)
3. 로그아웃
4. `refreshToken` 쿠키 삭제 확인
5. 새로고침
6. 자동 로그인 안됨 확인

### **3. 메모리 토큰 테스트**

1. 로그인 후 개발자 도구 → Application → Cookies에서 `accessToken` 없음 확인
2. 새로고침 후 자동 로그인됨 (리프레시 토큰으로 복원)
3. 로그아웃 후 새로고침 시 로그인 페이지로 이동

---

## 🔒 보안 개선사항

### **액세스 토큰 메모리 저장의 장점:**

1. **XSS 공격 방지**: JavaScript로 쿠키에 접근 불가
2. **CSRF 공격 방지**: 자동으로 쿠키가 전송되지 않음
3. **토큰 노출 위험 감소**: 개발자 도구에서 토큰이 보이지 않음

### **주의사항:**

1. **페이지 새로고침 시**: 리프레시 토큰으로 복원 필요
2. **브라우저 종료 시**: 재로그인 필요
3. **탭별 독립성**: 각 탭에서 독립적인 토큰 관리

---

**작성일**: 2025년 1월 26일  
**작성자**: 프론트엔드 개발팀  
**버전**: 2.0 (액세스 토큰 메모리 저장 방식으로 업데이트)
