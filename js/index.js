/**
 * axios trả về promise
 */

/**
 * lây data thừ server về
 */
function layDuLieuTuMayChu() {
  axios({
    method: "GET",
    url: "https://5fb26e6787ed490016ea8e2b.mockapi.io/nhanVien",
  })
    .then(function thanhCong(result) {
      console.log("result : ", result.data);
      danhSachNhanVien = result.data;
      hienThiDanhSachNV(danhSachNhanVien);
    })
    .catch(function thatBai(err) {
      console.log("err : ", err);
    });
}
layDuLieuTuMayChu();

var validatorNV = new Validator();

var danhSachNhanVien = [];

// getLocal();

/**
 * xử lý them và cập nhật
 */
document.getElementById("btnThem").addEventListener("click", function () {
  document.getElementById("id").disabled = true;
  document.getElementById("formNV").reset();
  document.getElementById("header-title").innerHTML = "Thêm Nhân Viên";
  document.getElementById("btnThemNV").style.display = "block";
  document.getElementById("btnCapNhat").style.display = "none";
});

/**
 * chức năng thêm nhân viên , các bước thực hiện :
 *  1/ bắt sự kiện click cho nút thêm nhân viên - done
 *  2/ lấy data người dùng nhập vào - done
 *  3/ tạo đối tượng nhân viên từ lớp đối tượng nhân viên - done
 *  4/ thêm đối tượng nhân viên vào danh sách nhân viên
 *  5/ hiện thị danh sách nhân viên lên màn hình
 */

document.getElementById("btnThemNV").addEventListener("click", function () {
  // lấy data người dùng nhập vào
  var _id = document.getElementById("id").value;
  var _name = document.getElementById("name").value;
  var _email = document.getElementById("email").value;
  var _password = document.getElementById("password").value;
  var _ngayBatDau = document.getElementById("datepicker").value;
  var _chucvu = document.getElementById("chucvu").value;

  // validation - kiểm trả dử liệu
  /**
   * isValid có 2 trạng thái:
   *  hợp lệ : true
   *  không hợp lệ : false
   */
  var isValid;
  /**
   * isValid = a && b ; khi a là false thì sẽ ko chạy b và trả về kết quả là false cho isValid
   * isValid = a & b; khi a là false thì vẫn chạy b và trả về kết quả là false cho isValid
   */
  // kiểm tra _id
  // isValid =
  //   validatorNV.kiemTraRong(_id, "tbMaNV") &&
  //   validatorNV.kiemTraSo(_id, "tbMaNV") &&
  //   validatorNV.kiemTraDoDai(_id, "tbMaNV", 2, 20);
  // kiểm tra _name
  // lấy isValid của id && kiemTraRong cua ten
  // isValid = isValid & validatorNV.kiemTraRong(_name, "tbTen");
  isValid = validatorNV.kiemTraRong(_name, "tbTen");
  // kiểm tra _email
  isValid &=
    validatorNV.kiemTraRong(_email, "tbEmail") &&
    validatorNV.kiemTraEmail(_email, "tbEmail");

  /**
   * nếu giá trị nhập vào hợp lệ thì thực hiện thêm nhân viên
   * nếu không hợp lệ thì ko cần làm gì cả
   */
  debugger;
  if (isValid) {
    // tạo đối tượng nhân viên từ lớp đối tượng nhân viên
    var nhanVien = new NhanVien(
      _id,
      _name,
      _email,
      _password,
      _ngayBatDau,
      _chucvu
    );

    axios({
      method: "POST",
      url: "https://5fb26e6787ed490016ea8e2b.mockapi.io/nhanVien",
      data: nhanVien,
    })
      .then(function (res) {
        console.log(res);
        alert("thêm thành công");
        layDuLieuTuMayChu();
      })
      .catch(function (err) {
        console.log(err);
      });

    // // đẩy nhanVien vào cuối mãng danhSachNhanVien
    // danhSachNhanVien.push(nhanVien);
    // // lưun lại danh Sach Nhan Vien
    // saveLocal();
    // // hiển thị data ra màn hình
    // hienThiDanhSachNV(danhSachNhanVien);
  }
});

/**
 * hiển thị danh sách nhân viên ra màn hình
 */
function hienThiDanhSachNV(dsnv) {
  var contentTbody = ``;
  for (var i = 0; i < dsnv.length; i++) {
    var nhanVien = dsnv[i];
    contentTbody += `
    <tr>
        <td>${nhanVien.id}</td>
        <td>${nhanVien.name}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayBatDau}</td>
        <td>${nhanVien.chucvu}</td>
        <td>
            <button 
              class="btn btn-info" 
              data-toggle="modal" 
              data-target="#myModal"
              onclick="xuLySua('${nhanVien.id}')"
            >
              Sửa
            </button>
            <button class="btn btn-danger" onclick="xuLyXoa('${nhanVien.id}')" >
                Xóa
            </button>
        </td>
    </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = contentTbody;
}

/**
 * chức năng xóa nhân viên , các bước thực hiện
 *  1/ truyền tham số id vao hàm xu ly xoa
 *  2/ tim index của phan tử cần xóa
 *  3/ dùng hàm splice để xóa , tham số thứ nhất là vị trí cần xóa , tham số thứ 2 là số lượng phần tử sẽ xóa
 */

function xuLyXoa(id) {
  axios({
    method: "DELETE",
    // url: "https://5fb26e6787ed490016ea8e2b.mockapi.io/nhanVien/" + id,
    url: `https://5fb26e6787ed490016ea8e2b.mockapi.io/nhanVien/${id}`,
  })
    .then(function thanhCong(res) {
      console.log(res.data);
      alert(`đã xóa nhân viên có tên là :  ${res.data.name}`);
      layDuLieuTuMayChu();
    })
    .catch(function thatBai(err) {
      console.log(err);
    });
  // // tìm chỉ mục ( index )
  // //  === so sánh kiểu dử liệu và giá trị
  // // c1
  // var index;
  // for (var i = 0; i < danhSachNhanVien.length; i++) {
  //   var nhanVien = danhSachNhanVien[i];
  //   if (nhanVien.id === id) {
  //     index = i;
  //   }
  // }
  // // c2
  // var index = danhSachNhanVien.findIndex(function (nhanVien) {
  //   return nhanVien.id === id;
  // });
  // // xóa phần tử khoải mãng
  // danhSachNhanVien.splice(index, 1);
  // // lưun lại danh Sach Nhan Vien
  // saveLocal();
  // // hiển thị
  // hienThiDanhSachNV(danhSachNhanVien);
}

/**
 * chức năng sửa , các bước thực hiện :
 *  1/ truyền id vào hàm xuLySua
 *  2/ tìm vị trí của nhân viên cần sửa trong danh sách nhân viên
 *  3/ lấy nhân viên cần sửa gáng cho một biến
 *  4/ hiển thị thông tin nhân viên lên form
 */
function xuLySua(id) {
  axios({
    method: "GET",
    url: `https://5fb26e6787ed490016ea8e2b.mockapi.io/nhanVien/${id}`,
  })
    .then(function (res) {
      console.log(res);
      var nhanVienSua = res.data;
      document.getElementById("id").value = nhanVienSua.id;
      document.getElementById("name").value = nhanVienSua.name;
      document.getElementById("email").value = nhanVienSua.email;
      document.getElementById("password").value = nhanVienSua.password;
      document.getElementById("datepicker").value = nhanVienSua.ngayBatDau;
      document.getElementById("chucvu").value = nhanVienSua.chucvu;
    })
    .catch(function (err) {
      console.log(err);
    });
  // sửa UI
  document.getElementById("header-title").innerHTML = "Edit Nhân Viên";
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "block";
  // disbled input id
  document.getElementById("id").disabled = true;
  // // tìm vị trí của nhân viên cần sửa trong danh sách nhân viên
  // var index = danhSachNhanVien.findIndex(function (nhanVien) {
  //   return nhanVien.id === id;
  // });
  // // lấy nhân viên cần sửa gáng cho một biến
  // var nhaVienSua = danhSachNhanVien[index];
  // // hiển thị thông tin nhân viên lên form
  // document.getElementById("id").value = nhaVienSua.id;
  // document.getElementById("name").value = nhaVienSua.name;
  // document.getElementById("email").value = nhaVienSua.email;
  // document.getElementById("password").value = nhaVienSua.password;
  // document.getElementById("datepicker").value = nhaVienSua.ngayBatDau;
  // document.getElementById("chucvu").value = nhaVienSua.chucvu;
}

/**
 * cập nhật
 *  1/ bắt sự kiện click cho nút button cập nhật
 *  2/ lấy data mà người dùng nhập vào
 *  3/ tạo ra nhân viên mới
 *  4/ tìm vị trí của nhân viên cần cập nhật trong danh sách nhân viên
 *  5/ cập nhật lại danhSachNhanVien
 *  6/ hiển thị danhSachNhanVien ra nguoi dung coi
 */

document.getElementById("btnCapNhat").addEventListener("click", function () {
  // lấy data người dùng nhập vào
  var _id = document.getElementById("id").value;
  var _name = document.getElementById("name").value;
  var _email = document.getElementById("email").value;
  var _password = document.getElementById("password").value;
  var _ngayBatDau = document.getElementById("datepicker").value;
  var _chucvu = document.getElementById("chucvu").value;

  // tạo đối tượng nhân viên từ lớp đối tượng nhân viên
  var newNhanVien = new NhanVien(
    _id,
    _name,
    _email,
    _password,
    _ngayBatDau,
    _chucvu
  );

  axios({
    method: "PUT", // post | put | get | delete
    url: `https://5fb26e6787ed490016ea8e2b.mockapi.io/nhanVien/${_id}`,
    data: newNhanVien,
  })
    .then(function (res) {
      console.log(res);
      alert("cập nhật thành công");
      layDuLieuTuMayChu();
    })
    .catch(function (err) {
      console.log(err);
    });

  // // tìm vị trí của nhân viên cần cập nhật trong danh sách nhân viên
  // var index = danhSachNhanVien.findIndex(function (nhanVien) {
  //   return nhanVien.id === newNhanVien.id;
  // });

  // // cập nhật lại danhSachNhanVien
  // // mang = ["a","b","c"]
  // // mang[2] = "d"
  // danhSachNhanVien[index] = newNhanVien;
  // // lưun lại danh Sach Nhan Vien
  // saveLocal();
  // // hiển thị danhSachNhanVien ra nguoi dung coi
  // hienThiDanhSachNV(danhSachNhanVien);
});

// lưu danh sách nhân viên vào localStorage
function saveLocal() {
  localStorage.setItem("dsnv", JSON.stringify(danhSachNhanVien));
}

// lấy danh sách nhân viên từ localStorage
function getLocal() {
  console.log(localStorage.getItem("dsnv")); // null
  if (localStorage.getItem("dsnv")) {
    danhSachNhanVien = JSON.parse(localStorage.getItem("dsnv"));
  }
}

/**
 * search
 */
document
  .getElementById("searchName")
  .addEventListener("keyup", function (event) {
    // lấy từ khóa search
    // c1
    // var keyWord = document.getElementById("searchName").value;
    // c2
    var keyWord = event.target.value;

    // search
    // c1 for
    var danhSachNhanVienSearch = [];
    for (var i = 0; i < danhSachNhanVien.length; i++) {
      var nhanVien = danhSachNhanVien[i];
      if (nhanVien.name.includes(keyWord)) {
        danhSachNhanVienSearch.push(nhanVien);
      }
    }
    // c2 filter
    var danhSachNhanVienSearch = danhSachNhanVien.filter(function (nhanVien) {
      return nhanVien.name.includes(keyWord);
    });
    hienThiDanhSachNV(danhSachNhanVienSearch);
  });
