function Validator() {
  // tạo phương thức kiểm tra data
  this.kiemTraRong = function (value, idTb) {
    if (value.trim() === "") {
      // hiển thị lỗi lên màn hình
      document.getElementById(idTb).innerHTML = "Không để trống!";
      document.getElementById(idTb).style.display = "block";
      return false;
    } else {
      // ẩn thẻ thông báo lỗi
      document.getElementById(idTb).innerHTML = "";
      document.getElementById(idTb).style.display = "none";
      return true;
    }
  };
  this.kiemTraSo = function (value, idTb) {
    var pattern = /^[0-9]+$/;
    if (value.match(pattern)) {
      document.getElementById(idTb).innerHTML = "";
      document.getElementById(idTb).style.display = "none";
      return true;
    } else {
      document.getElementById(idTb).innerHTML = "Mã số nhân viên phải là số !";
      document.getElementById(idTb).style.display = "block";
      return false;
    }
  };
  this.kiemTraDoDai = function (value, idTb, min, max) {
    if (value.length > min && value.length < max) {
      document.getElementById(idTb).innerHTML = "";
      document.getElementById(idTb).style.display = "none";
      return true;
    } else {
      document.getElementById(idTb).innerHTML = `độ dài từ ${min} - ${max}`;
      document.getElementById(idTb).style.display = "block";
      return false;
    }
  };
  this.kiemTraEmail = function (value, idTb) {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (value.match(pattern)) {
      document.getElementById(idTb).innerHTML = "";
      document.getElementById(idTb).style.display = "none";
      return true;
    } else {
      document.getElementById(idTb).innerHTML = "Email Không Hợp lệ @@";
      document.getElementById(idTb).style.display = "block";
      return false;
    }
  };
}
