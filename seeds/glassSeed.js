const title = [
    "유리병",
    "술, 탄산음료 병",
    "내열 유리",
    "도자기, 사기 그릇",
    "대형 유리",
    "형광등",
    "전구",
    "LED",
    "향수",
    "기름병",
];
const recycle = [true, true, false, false, false, false, false, false, true, true];
const category = ["유리"];
const kind = {
    0: ["잡병", "잼병", "유리소스병", "음료수병", "비타민음료병", "박카스병"],
    1: ["소주병", "맥주병", "와인병", "콜라병", "사이다병", "탄산음료병"],
    2: ["전자레인지", "오븐 등에 사용되는 내열 유리"],
    3: ["도자기", "사기 그릇"],
    4: ["전신 거울", "식탁 유리"],
    5: ["형광등", "삼파장 전구", "깨진 형광등"],
    6: ["백열등", "백열전구", "깨진 전구"],
    7: ["LED전구", "LED조명", "발광다이오드"],
    8: ["향수병"],
    9: ["참기름병", "들기름병", "올리브 오일"],
};

const note = {
    0: ["깨진 유리병은 분리수거가 불가능하므로 일반 쓰레기로 배출"],
    1: ["맥주, 소주 등 공병보증금 환불이 가능한 보증금병은 마트 등에서 보증금을 받고 교환"],
    2: ["깨졌을 시 신문지 등으로 감싸 넣은 후 깨진 유리가 들어있다고 표시해야 함"],
    3: ["봉투보다 버리는 그릇의 사이즈가 작더라도 규격 봉투에 배출해야 함"],
    4: ["깨진 유리나 거울은 신문지로 잘 감싼 뒤 불연성 쓰레기 봉투에 넣어 배출"],
    5: [
        "형광등 내부의 수은이 인체에 매우 해로운 물질",
        "수은이 공기 중에 유출되지 않도록 깨지지 않게 버리기",
    ],
    6: ["깨진 전구는 신문지로 잘 감싼 뒤 불연성 쓰레기 봉투에 넣어 배출"],
    7: [
        "led 조명은 대부분 플라스틱이지만 유리가 포함되어 있다면 깨질 위험이 있으니 신문지에 감싸 배출",
    ],
    8: [
        "용기 내부의 향수는 대부분 화학제품",
        "키친타올, 신문지 등으로 흡수시킨 뒤 일반쓰레기로 배출",
    ],
    9: ["기름기를 제거하지 않은 경우 재활용 불가능"],
};
const image = {
    0: "http://www.cookiebebe.com/shopimages/cookiebebe/009002000484.jpg?1536569207",
    1: "http://img.khan.co.kr/news/2010/11/14/20101115.01200129000006.02M.jpg",
    2: "https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/5305850857549690-1ceb3519-68d6-41ed-b26c-068ee169c82e.jpg",
    3: "https://korean.ceramics-mugs.com/photo/pt34592436-reactive_glazed_silk_screen_8_inch_ceramic_bowl_mini_size_for_rice.jpg",
    4: "https://oneroommaking.com/web/product/small/201810/f99096bbdfe9166a70c7e8d563a48fce.jpg",
    5: "https://boorank.com/getImage.php?l=retail/images/5902755558264-01710583-77d4-4c44-86b3-020e78a4a4e9.jpg",
    6: "https://lightingart.kr/web/product/big/201804/1443_shop1_991661.jpg",
    7: "https://m.uik21.co.kr/web/product/medium/202111/5d4cede04df0226cab1b2388c1003b0e.jpg",
    8: "http://mataba.co.kr/web/product/big/20200618/8d6d1c5c30e87b7387bfc6ec0849d429.jpg",
    9: "http://gdimg.gmarket.co.kr/658323590/still/600?ver=1650008203",
};

const throwAway = {
    0: [
        "내용물을 비운 뒤 세척",
        "재질이 다른 병뚜껑, 상표 등을 제거",
        "병의 색깔을 구별하여 유리병 배출함에 버리기",
    ],
    1: ["내용물을 비운 뒤 세척", "재질이 다른 병뚜껑, 상표 등을 제거", "유리병 배출함에 버리기"],
    2: ["일반 쓰레기로 배출"],
    3: ["특수 규격 봉투에 담아 배출"],
    4: [
        "지자체 홈페이지에서 대형폐기물 접수",
        "폐기물 스티커를 인쇄하거나 발급받아 부착",
        "집 밖으로 옮겨두면 폐기물 수거 업체에서 수거",
    ],
    5: [
        "아파트 단지내 또는 가까운 주민센터 등에 설치된 형광등 전용 수거함에 배출",
        "깨진 형광등의 경우 신문지로 잘 감싼 뒤 불연성 쓰레기 봉투(마대)에 담아 배출",
    ],
    6: ["불연성 쓰레기 봉투(마대)에 넣어 배출"],
    7: ["일반 쓰레기로 배출"],
    8: ["용기 내부의 향수는 완전히 비워낸 뒤 세척", "깨끗하게 세척한 향수병은 유리로 분리 후 배출"],
    9: [
        "내용물을 비운 뒤 기름기 제거",
        "내부의 기름은 1차 뜨거운 물, 2차 씻어 말린 달걀 껍질과 베이킹 소다를 1~2스푼 넣어 흔들어 제거",
        "말린 뒤 배출함에 버리기",
        "재질이 다른 뚜껑, 상표 등을 제거 후 재질에 맞춰 따로 배출",
    ],
};

export const glass = title.map((title, index) => {
    return {
        title,
        description: { throwAway: throwAway[index], note: note[index] },
        image: image[index],
        kind: kind[index],
        recycle: recycle[index],
        category,
    };
});

/**
  {
    title: '기름병',
    description: {
      throwAway: [
        '내용물을 비운 뒤 기름기 제거',
        '내부의 기름은 1차 뜨거운 물, 2차 씻어 말린 달걀 껍질과 베이킹 소다를 1~2스푼 넣어 흔들어 제거',
        '말린 뒤 배출함에 버리기',
        '재질이 다른 뚜껑, 상표 등을 제거 후 재질에 맞춰 따로 배출'
      ],
      note: [ '기름기를 제거하지 않은 경우 재활용 불가능' ]
    },
    image: 'http://gdimg.gmarket.co.kr/658323590/still/600?ver=1650008203',
    kind: [ '참기름병', '들기름병', '올리브 오일' ],
    recycle: true,
    category: '유리'
  }
*/
// Object.values(result).map((trash) => {
//   console.log(trash);
// });
