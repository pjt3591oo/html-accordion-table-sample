const accordion = new Accordion('body', []);
const LIMIT = 4;

async function clickHandlerByPageChange () {
  const page = parseInt(this.dataset.page);
  const users = await getUser(page, LIMIT);
  accordion.setData(users, { isRerender: true });
}

async function getUser(page, limit) {
  return new Promise((res, rej) => {
    const temp = [];
    for(let i = page * limit; i < (page * limit) + limit ; ++i) {
      temp.push({
        id: i,
        name: `멍개${i}`,
        age: `나이${i}`,
        addr: `주소${i}`,
        desc: `상세내용${i}`,
      });
    }
    setTimeout(() => {
      res(temp);
    }, 500)
  })
}

async function main() {
  const users = await getUser(0, LIMIT);
  accordion.setData(users, { isRerender: true });
  
  const pages = document.getElementsByClassName('page');
  for (const page of pages) {
    page.addEventListener('click', clickHandlerByPageChange);
  }
}

main()