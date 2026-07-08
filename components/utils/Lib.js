function DiffrenceDateLetter(difDays) {
  let letters = [
    ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"],
    [
      "ده",
      "یازده",
      "دوازده",
      "سیزده",
      "چهارده",
      "پانزده",
      "شانزده",
      "هفده",
      "هجده",
      "نوزده",
      "بیست",
    ],
    ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"],
    [
      "",
      "یکصد",
      "دویست",
      "سیصد",
      "چهارصد",
      "پانصد",
      "ششصد",
      "هفتصد",
      "هشتصد",
      "نهصد",
    ],
  ];

  function convertNumberToPersianWords(num) {
    if (num === 0) return "صفر";
    if (num < 10) return letters[0][num];
    if (num < 21) return letters[1][num - 10];
    if (num < 100) {
      const tens = Math.floor(num / 10);
      const ones = num % 10;
      return letters[2][tens] + (ones ? " و " + letters[0][ones] : "");
    }
    if (num < 1000) {
      const hundreds = Math.floor(num / 100);
      const remainder = num % 100;
      return letters[3][hundreds] + (remainder ? " و " + convertNumberToPersianWords(remainder) : "");
    }
    return num.toString(); // برای اعداد بزرگتر در صورت نیاز میشه گسترش داد
  }

  let ReturnObject = {
    type: "",
    dif: "",
  };

  if (difDays === 0) {
    ReturnObject.type = "hour";
    ReturnObject.dif = 0;
  } else if (difDays < 7) {
    ReturnObject.type = "day";
    ReturnObject.dif = convertNumberToPersianWords(difDays);
  } else if (difDays < 30) {
    const weeks = Math.ceil(difDays / 7);
   
    ReturnObject.type = "week";
    ReturnObject.dif = weeks;
  } else if (difDays < 365) {
  
    const months = Math.ceil(difDays / 30);
    ReturnObject.type = "month";
    ReturnObject.dif = months;
  } else {
    const years = Math.floor(difDays / 365);
    ReturnObject.type = "year";
    ReturnObject.dif = years;
  }

  return ReturnObject;
}
export function createDateStr(Create_Date){
    const {type,dif}=Create_Date
   console.log(type,dif)
    switch (type) {
        case 'year':
            return (
                <span>
                    <span className="numfarsi-s1">{dif}</span> سال پیش
                </span>
            );

        case 'month':
            return (
                <span>
                    <span className="numfarsi-s1">{dif}</span> ماه پیش
                </span>
            );

        case 'week':
            return (
                <span>
                    <span className="numfarsi-s1">{dif}</span> هفته پیش
                </span>
            );

        case 'day':
            return (
                <span>
                    <span className="numfarsi-s1">{dif}</span> روز پیش
                </span>
            );

        default:
            return 'ساعاتی پیش';
    }
}

function DiffrenceDate(date1, date2) {
  let DiffDays = 0;

  if (date2 - date1 > 0) {
    const diffTime = Math.abs(date2 - date1);

    DiffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return DiffDays;
}

export function token(length) {
  //edit the token allowed characters
  var a = "a3bcd342efghijklmnopqrstu135vw4xyzABC545DEFGHIJK334LMNOPQRSTUVWXYZ1234890".split(
    ""
  );
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}
export function rand(length) {
  return Math.floor(Math.random() * 100000);
}
export function checkphonenumbervalidity(phonenumber) {
  var patt = new RegExp(/^\d{11}$/g);
  //phonenumber="191 541 754 3010";
  return patt.test(phonenumber);
}
export function persiandate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  var dtlong = new Date(date).toLocaleDateString("fa-IR", options);
  dtlong = dtlong.replace(",", " ");

  var dt = new Date(date).toLocaleDateString("fa-IR");

  //let current = new dt.toLocaleDateString('fa-IR');
  const p2e = dt.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  let retDate = p2e.replace("/", "-");
  retDate = retDate.replace("/", "-");
  //-------------------------------------
  dtlong = dtlong.trim().replace(/\s+/g, " "); // حذف فاصله‌های اضافه
  const myArray = dtlong.split(" ");
  // console.log(myArray)
  const formattedText = `${myArray[3]} ${myArray[2]} ${myArray[1]}`;

  //-------------------------------------
  return [retDate, formattedText];
}
export function createDateLetter(date) {
  const Nowdate = new Date();
  const CreateDate = new Date(date);
  const { type, dif } = DiffrenceDateLetter(DiffrenceDate(CreateDate, Nowdate));

return {type,dif}
  

}
export function StartDate4MYSQL(date) {
  //console.log(date.toISOString());
  return date.toISOString().split("T")[0] + " " + " 00:00:00";
}
export function EndDate4MYSQL(date) {
  //console.log(date.toISOString());
  return date.toISOString().split("T")[0] + " " + "23:59:59";
}
export function Converdate(datemiladi) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var ret = new Date(datemiladi).toLocaleDateString("fa-IR", options);

  return ret;
}
export function RemoveDublicateValueArray(data) {
  return data.filter((value, index) => data.indexOf(value) === index);
}
export function base64ToBlob(base64, mime = "image/jpeg") {
  const byteString = atob(base64.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mime });
}



//////////////////////////////////
