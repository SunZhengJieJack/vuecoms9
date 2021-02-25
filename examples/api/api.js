

export const getList = (datas, page) => {
  return new Promise((reolve, reject) => {
    setTimeout(() => {
      let data = {
        list: [
          {
            name: '小明',
            age: 18,
            gender: 0,
            data: datas.pageNo
          },
          {
            name: '小兰',
            age: 20,
            gender: 1,
            data: datas.pageNo
          },
          {
            name: '韩孝周',
            age: 20,
            gender: 1,
            data: datas.pageNo
          }
        ],
        total: 100,
      }
      reolve(data)
    }, 1500);
  })
}


export const getSelect = (datas, page) => {
  return new Promise((reolve, reject) => {
    setTimeout(() => {
      let data = {
        list: [
          {
            label: '动态select',
            value: '0',
          },
          {
            label: '动态select',
            value: '1',
          },
        ],
      }
      reolve(data)
    }, 1500);
  })
}