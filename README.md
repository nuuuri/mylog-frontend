# mylog-frontend

### 프로젝트 구조

```
mylog-frontend
├── src
│   ├── @types            => 공통으로 사용되는 Type관리(.d.ts)
│   ├── assets            => 에셋, 이미지, 폰트 등의 파일
│   ├── common
│        ├── axios        => Axios 설정 관리
│        └── utils        => 자주 쓰이는 함수 관리
│   ├── components        => 공통 단위 컴포넌트 관리
│   ├── layouts           => 레이아웃 컴포넌트 관리
│   ├── pages             => 페이지 컴포넌트 관리
│   ├── routes            => Router 관리
│   ├── styles            => 전역 스타일, 자주 쓰이는 스타일 관리
│   └── tests             => 테스트 관리
├── .gitignore            => git 관리 비대상 설정 파일
├── pacakge-lock.json     => 의존성에 관한 구체적인 정보를 갖는 파일(package-lock.json이 있을경우 package.json을 참조하지 않는다)
├── package.json          => Module정보 설정 파일
├── README.md             => 프로젝트 설명 파일
└── tscofig.json          => Typescript 설정 파일
```
