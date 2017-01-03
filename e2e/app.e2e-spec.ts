import { LedgerFrontendPage } from './app.po';

describe('ledger-frontend App', function() {
  let page: LedgerFrontendPage;

  beforeEach(() => {
    page = new LedgerFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
