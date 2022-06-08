const title = ["스티로폼", "컵라면"];
const recycle = true;
const category = ["스티로폼"];
const kind = {
    0: ["스티로폼"],
    1: ["다양한 스티로폼 컵라면 용기"],
};
const note = {
    0: [
        "무늬, 색상이 있거나 비닐로 코팅된 스티로폼은 재활용 불가",
        "과일 등의 개별 포장에 쓰이는 스티로폼은 일반쓰레기로 배출",
    ],
    1: [
        "라면 국물이 남아있거나, 음식물이 완전히 제거 되지 않은 컵라면 용기는 재활용 불가능하므로 일반쓰레기로 배출",
    ],
};
const image = {
    0: "http://m.woolimpackage.com/web/product/big/201905/27c9b077299857b92aad24e3239b6fb8.png",
    1: "https://upload.wikimedia.org/wikipedia/commons/0/0a/PSP%EB%9D%BC%EB%A9%B4%EC%9A%A9%EA%B8%B0.png",
};
const throwAway = {
    0: [
        "내용물, 이물질을 비우고 세척",
        "스티로폼에 붙여져 있는 송장, 스티커 등 제거",
        "스티로폼으로 분리 후 배출",
    ],
    1: [
        "컵라면 용기를 물로 세척",
        "햇빛에 하루 이상 말려 기름, 국물 자국 제거",
        "흰 색의 용기로 만든 뒤 배출",
    ],
};

export const styrofoam = title.map((title, index) => {
    return {
        title,
        description: { throwAway: throwAway[index], note: note[index] },
        image: image[index],
        kind: kind[index],
        recycle,
        category,
    };
});

/**
  {
    title: '컵라면',
    description: {
      throwAway: [
        '컵라면 용기를 물로 세척',
        '햇빛에 하루 이상 말려 기름, 국물 자국 제거',
        '흰 색의 용기로 만든 뒤 배출'
      ],
      note: [ '라면 국물이 남아있거나, 음식물이 완전히 제거 되지 않은 컵라면 용기는 재활용 불가능하므로 일반쓰레기로 배출' ]
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/PSP%EB%9D%BC%EB%A9%B4%EC%9A%A9%EA%B8%B0.png',
    kind: [ '다양한 스티로폼 컵라면 용기' ],
    recycle: true,
    category: '스티로폼'
  }
 */
// Object.values(styrofoam).map((trash) => {
//   console.log(trash);
// });
