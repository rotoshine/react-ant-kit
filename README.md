# React Ant Kit 

React 기반의 Admin UI Kit

### Webpack Dev server

``` sh
npm run start

// yarn 사용 시
yarn start
```
api proxy가 필요한 경우 `package.json`의 `proxy` 부분을 수정하여 고치면 된다.

## 개발하는 법

### 메뉴와 페이지를 추가하기

* `src/pages/` 아래에 페이지를 렌더링 할 컴포넌트를 추가한다. 다른 컴포넌트들과 구분을 위해 `~~~Page.jsx` 라는 이름으로 만든다.
* `src/router.js` 에 추가한 페이지 컴포넌트와 path를 매핑한다.
* `src/layout/AppLayout` 의 `<Sider />` 컴포넌트 쪽에 아래와 같이 메뉴를 추가한다.  
```jsx harmony 
<Menu.Item key="/"> /* route path */
    <NavLink to="/"> /* route path */
      <Icon type="appstore-o"/> /* type에 app icon을 넣는다 */
      <span className="nav-text">Menu Text</span>
    </NavLink>
</Menu.Item>
```

### 비동기 처리

todo 

