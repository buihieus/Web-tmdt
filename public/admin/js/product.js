//Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    // console.log(path);
  buttonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = statusCurrent == "active" ? "inactive" : "active";

      // console.log(statusCurrent);
      // console.log(id);
      // console.log(statusChange);

      const action = path + `/${statusChange}/${id}?_method=PATCH`;//sử dụng override method để sử dụng phương thức patch
      console.log(action);
      formChangeStatus.setAttribute("action", action);
      formChangeStatus.submit();
    });
  });
}
//End change status

//Delete item
const deleteButton = document.querySelectorAll("[button-delete]");
if (deleteButton.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");
  deleteButton.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Are you sure you want to delete");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDeleteItem.setAttribute("action", action);
        formDeleteItem.submit();
      }
    });
  });
}
//End Delete Item