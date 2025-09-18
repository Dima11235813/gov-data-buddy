import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  
  const setUpComponent = () => {
    component = new HomePageComponent()
  }
  beforeEach(() => {
    setUpComponent()
  });

  it('should create ', () => {
    expect(component).toBeTruthy();
  });
});
