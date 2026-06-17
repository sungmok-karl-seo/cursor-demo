# cursor-demo

이메일 검증·추출 유틸리티를 제공하는 Node.js ES Module 프로젝트입니다.

## 설치 및 테스트

```bash
npm test
```

## 릴리스 노트

### v1.0.0 — RFC 5322 이메일 검증과 추출·필터링 유틸리티를 제공하는 첫 릴리스

#### ✨ 기능

- **RFC 5322 이메일 검증** (`validator.js`)
  - `isValidEmail(email)` — RFC 5322 정규식 + RFC 3696 길이 제한(로컬 파트 64자, 전체 254자)
  - IP 옥텟 버그가 수정된 정규식 패턴 적용
- **이메일 추출·필터링** (`email.js`)
  - `extractEmails(users)` — 사용자 배열에서 `email` 필드 추출
  - `getValidEmails(users)` — 유효한 이메일만 필터링
  - `uniqueValidEmails(users)` — 유효 이메일 중복 제거
  - `isValidEmail` re-export (하위 호환)
- **ES Module** — `import`/`export` 기반 모듈 구조
- **테스트** — Node.js 내장 테스트 러너로 `email.js` 단위 테스트 (`npm test`)
- **진입점** — `src/index.js`에서 `getValidEmails`, `uniqueValidEmails` export

#### 🧹 기타

- `docs/validator.md` — `validator.js` 스펙·연동 규칙 문서화
- `.cursor/skills/release-notes` — 릴리스 노트 작성 스킬 및 `collect_commits.sh` 스크립트
