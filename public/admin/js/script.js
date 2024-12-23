/*Button status*/
const buttonsStatus = document.querySelectorAll("[button-status]");
// console.log(buttonsStatus);
if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonsStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      // console.log(status);

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
/*End Button status*/

//Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngăn load lại trang
    const keyword = event.target.elements.keyword.value;
    console.log(event.target.elements.keyword.value);
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

//Pagination
const buttonPages = document.querySelectorAll("[button-page]");
if (buttonPages) {
  let url = new URL(window.location.href);
  buttonPages.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-page");
      // console.log(status);

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
//End pagination

//Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
//End checkbox Multi

//Form Change Multi Status (Lấy tất cả các id dán vào ô input ids để đẩy lên server để controller nhận được)
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    let typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Do you want to delete all items?");
      if (!isConfirm) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputsChecked.forEach((input) => {
        let id = input.value;
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi");
    }
  });
}
//End Form Change Multi Status

//Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute('data-time'));
  const closeAlert = showAlert.querySelector("[close-alert]");
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  },time);
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
//End show alert

//Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const inputImage = document.querySelector("[upload-image-input]");
  const previewImage = document.querySelector("[upload-image-preview]");
  inputImage.addEventListener("change", (e) => {
    const file = e.target.files[0]; //inputImage.files[0] == e.target.files[0]
    if (file) {
      previewImage.src = URL.createObjectURL(file);
    }
  });
}
//End Upload Image

//Sort
const sort = document.querySelector("[sort]");
if (sort) {
  let url = new URL(window.location.href);
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      const sortData = event.target.value;
      const [sortKey, sortValue] = sortData.split('-');
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
      window.location.href = url.href;
    });
  }
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  });

  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  if (sortKey && sortValue) {
    const sortString = `${sortKey}-${sortValue}`;
    const optionSelect = sort.querySelector(`option[value=${sortString}]`);
    optionSelect.selected = true;
  }
}
//End Sort