/**
 * Created by zhouzelin on 2016/7/22.
 * 保存车牌前缀
 */
//
var licenseData = [
    {
        value: '京',
        text: '京',
        province:'北京市',
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "O",
                text: "O"
            }
        ]
    },{
        value:'津',
        text: '津',
        province:'天津市',
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "E",
                text: "E"
            }
        ]
    },{
        value:'沪',
        text: '沪',
        province:'上海市',
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            }
        ]
    },{
        value:'渝',
        text: '渝',
        province:'重庆市',
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            }
        ]
    },{
        value:'冀',
        text: '冀',
        province : "河北省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "R",
                text: "R"
            },{
                value: "T",
                text: "T"
            }
        ]
    },{
        value:'豫',
        text: '豫',
        province : "河南省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            },{
                value: "Q",
                text: "Q"
            },{
                value: "R",
                text: "R"
            },{
                value: "S",
                text: "S"
            },{
                value: "U",
                text: "U"
            }
        ]
    },{
        value:'云',
        text: '云',
        province : "云南省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            },{
                value: "Q",
                text: "Q"
            },{
                value: "R",
                text: "R"
            },{
                value: "S",
                text: "S"
            }
        ]
    },{
        value:'辽',
        text: '辽',
        province : "辽宁省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            },{
                value: "V",
                text: "V"
            }
        ]
    },{
        value:'黑',
        text: '黑',
        province : "黑龙江省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            }
        ]
    },{
        value:'湘',
        text: '湘',
        province : "湖南省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            }
        ]
    },{
        value:'皖',
        text: '皖',
        province : "安徽省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            },{
                value: "Q",
                text: "Q"
            },{
                value: "R",
                text: "R"
            }
        ]
    },{
        value:'鲁',
        text: '鲁',
        province : "山东省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            },{
                value: "Q",
                text: "Q"
            },{
                value: "R",
                text: "R"
            },{
                value: "U",
                text: "U"
            }
        ]
    },{
        value:'新',
        text: '新',
        province : "新疆维吾尔自治区",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            },{
                value: "Q",
                text: "Q"
            },{
                value: "R",
                text: "R"
            }
        ]
    },{
        value:'苏',
        text: '苏',
        province : "江苏省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            }
        ]
    },{
        value:'浙',
        text: '浙',
        province : "浙江省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            }
        ]
    },{
        value:'赣',
        text: '赣',
        province : "江西省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            }
        ]
    },{
        value:'鄂',
        text: '鄂',
        province : "湖北省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            },{
                value: "Q",
                text: "Q"
            }
        ]
    },{
        value:'桂',
        text: '桂',
        province : "广西壮族自治区",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            }
        ]
    },{
        value:'甘',
        text: '甘',
        province : "甘肃省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            }
        ]
    },{
        value:'晋',
        text: '晋',
        province : "山西省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            }
        ]
    },{
        value:'蒙',
        text: '蒙',
        province : "内蒙古自治区",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            }
        ]
    },{
        value:'陕',
        text: '陕',
        province : "陕西省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "U",
                text: "U"
            }
        ]
    },{
        value:'吉',
        text: '吉',
        province : "吉林省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            }
        ]
    },{
        value:'闽',
        text: '闽',
        province : "福建省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            }
        ]
    },{
        value:'贵',
        text: '贵',
        province : "贵州省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            }
        ]
    },{
        value:'粤',
        text: '粤',
        province : "广东省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "M",
                text: "M"
            },{
                value: "N",
                text: "N"
            },{
                value: "P",
                text: "P"
            },{
                value: "Q",
                text: "Q"
            },{
                value: "R",
                text: "R"
            },{
                value: "S",
                text: "S"
            },{
                value: "T",
                text: "T"
            },{
                value: "U",
                text: "U"
            },{
                value: "V",
                text: "V"
            },{
                value: "W",
                text: "W"
            },{
                value: "X",
                text: "X"
            },{
                value: "Y",
                text: "Y"
            },{
                value: "Z",
                text: "Z"
            }
        ]
    },{
        value:'青',
        text: '青',
        province : "青海省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            },{
                value: "H",
                text: "H"
            }
        ]
    },{
        value:'藏',
        text: '藏',
        province : "西藏自治区",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "G",
                text: "G"
            }
        ]
    },{
        value:'川',
        text: '川',
        province : "四川省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            },{
                value: "E",
                text: "E"
            },{
                value: "F",
                text: "F"
            },{
                value: "H",
                text: "H"
            },{
                value: "J",
                text: "J"
            },{
                value: "K",
                text: "K"
            },{
                value: "L",
                text: "L"
            },{
                value: "Q",
                text: "Q"
            },{
                value: "R",
                text: "R"
            },{
                value: "S",
                text: "S"
            },{
                value: "T",
                text: "T"
            },{
                value: "L",
                text: "L"
            },{
                value: "U",
                text: "U"
            },{
                value: "V",
                text: "V"
            },{
                value: "W",
                text: "W"
            },{
                value: "X",
                text: "X"
            },{
                value: "Z",
                text: "Z"
            }
        ]
    },{
        value:'宁',
        text: '宁',
        province : "宁夏回族自治区",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            },{
                value: "D",
                text: "D"
            }
        ]
    },{
        value:'琼',
        text: '琼',
        province : "海南省",
        children: [
            {
                value: "A",
                text: "A"
            },{
                value: "B",
                text: "B"
            },{
                value: "C",
                text: "C"
            }
        ]
    }
]