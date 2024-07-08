alert((ask > 0) ? "+" : (ask == 0) ? "0" : "-");

if(alert > 0){
  alert("+");
} else if(alert == 0){
  alert("0");
}else{
  alert("-");
}

let num1 = 10,
  num2 = 20,
  result;
result ??= (num1 ?? num2);
alert(result);
