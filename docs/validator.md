# validator.js 스펙

> AI 리팩터링·코드 리뷰 기준 문서입니다.  
> 구현 파일: [`src/validator.js`](../src/validator.js)

## 모듈 개요

| 항목 | 값 |
|------|-----|
| 파일 경로 | `src/validator.js` |
| 모듈 형식 | ES Module (`export`) |
| 외부 의존성 | 없음 (npm 패키지 사용 금지) |
| 책임 | 이메일 형식 검증 |

## API

### `isValidEmail(email)`

이메일 문자열이 RFC 5322 형식과 RFC 3696 길이 제한을 만족하는지 검증한다.

| 항목 | 내용 |
|------|------|
| 입력 | `email: string` |
| 출력 | `boolean` — 유효하면 `true`, 아니면 `false` |
| JSDoc | 필수 (한국어) |

#### 검증 규칙 (순서대로 적용)

1. `typeof email !== 'string'` → `false`
2. `@` 위치(`lastIndexOf('@')`)가 `0` 이하 → `false` (로컬 파트 없음)
3. `@` 위치가 `64` 초과 → `false` (로컬 파트 RFC 3696 한도)
4. 전체 길이가 `254` 초과 → `false` (RFC 3696 한도)
5. RFC 5322 정규식 통과 → `true`, 실패 → `false`

#### 상수

| 이름 | 값 | 근거 |
|------|-----|------|
| `MAX_LOCAL_PART_LENGTH` | `64` | RFC 3696 |
| `MAX_EMAIL_LENGTH` | `254` | RFC 3696 |

#### 정규식

- RFC 5322 기반 패턴 (emailregex.com, IP 옥텟 버그 수정)
- 참고: https://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses
- 플래그: `'i'` (대소문자 무시)

#### 예시

| 입력 | 결과 |
|------|------|
| `'alice@example.com'` | `true` |
| `'user+tag@example.com'` | `true` |
| `'invalid-email'` | `false` |
| `''` | `false` |
| `null` | `false` |
| `'a'.repeat(64) + '@example.com'` | `true` |
| `'a'.repeat(65) + '@example.com'` | `false` |
| `'a'.repeat(243) + '@example.com'` | `false` |

---
| 함수 | 역할 | validator.js 사용 |
|------|------|-------------------|
| `extractEmails(users)` | 사용자 배열에서 `email` 필드 추출 | 사용 안 함 |
| `getValidEmails(users)` | 유효한 이메일만 필터링 | `isValidEmail` 사용 |
| `uniqueValidEmails(users)` | 유효 이메일 중복 제거 | `getValidEmails` 경유 |

#### `getValidEmails` 구현 패턴 (필수)

```js
import { isValidEmail } from './validator.js';

export function getValidEmails(users) {
  return extractEmails(users).filter(isValidEmail);
}
```

- `extractEmails`는 `email.js`에 유지한다.
- 검증 로직은 `validator.js`에만 둔다.
- `email.js`는 `isValidEmail`을 re-export할 수 있다 (하위 호환).
