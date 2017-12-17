import { makeURL, API_ROOT } from '../api';


describe('makeURL', ()=>{

  it('endpoint 가 상대 경로 이면, API_ROOT가 붙어서 URL을 만든다.', ()=>{

    // given
    const endpoint = 'localized_app/';

    // when
    const value = makeURL('GET', endpoint);

    // then
    expect( value ).toBe(API_ROOT+endpoint);
  });


  it('endpoint 가 절대 경로(http- 나 슬래쉬(/)로 시작)면 API_ROOT가 없는 URL을 만든다.', ()=>{

    // given
    const endpoint = '/auth/';

    // when
    const value = makeURL('GET', endpoint);

    // then
    expect( value ).toBe(endpoint);
  });

});


