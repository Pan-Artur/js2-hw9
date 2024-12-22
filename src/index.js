// Task 1

const todoList = () => {
  const inputEl = document.querySelector(".todo-input");
  const buttonEl = document.querySelector(".todo-button");
  const errorEl = document.querySelector(".todo-error");
  const listEl = document.querySelector(".todo-list");

  const getTasksFromLocalStorage = () =>
    JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasksToLocalStorage = (tasks) =>
    localStorage.setItem("tasks", JSON.stringify(tasks));

  buttonEl.addEventListener("click", () => {
    if (inputEl.value.length === 0) {
      errorEl.classList.remove("hidden");

      setTimeout(() => {
        errorEl.classList.add("hidden");
      }, 2000);
    } else {
      const itemEl = document.createElement("li");
      itemEl.classList.add("todo-item");
      listEl.prepend(itemEl);

      const itemTitleEl = document.createElement("p");
      itemTitleEl.textContent = inputEl.value;
      itemEl.append(itemTitleEl);

      const checkboxEl = document.createElement("input");
      checkboxEl.type = "checkbox";
      checkboxEl.classList.add("todo-checkbox");
      itemEl.append(checkboxEl);

      updateLocalStorage();

      checkboxEl.addEventListener("change", () => {
        if (checkboxEl.checked) {
          itemEl.classList.add("completed");
        } else {
          itemEl.classList.remove("completed");
        }

        updateLocalStorage();
      });

      const deleteButtonEl = document.createElement("button");
      deleteButtonEl.textContent = "remove";
      deleteButtonEl.classList.add("delete-button");
      itemEl.append(deleteButtonEl);

      deleteButtonEl.addEventListener("click", () => {
        itemEl.remove();
        updateLocalStorage();
      });

      inputEl.value = "";

      updateLocalStorage();
    }
  });

  const loadTasks = () => {
    const tasks = getTasksFromLocalStorage();

    tasks.forEach((task) => {
      const itemEl = document.createElement("li");
      itemEl.classList.add("todo-item");
      if (task.completed) {
        itemEl.classList.add("completed");
      }
      listEl.append(itemEl);

      const itemTitleEl = document.createElement("p");
      itemTitleEl.textContent = task.text;
      itemEl.append(itemTitleEl);

      const checkboxEl = document.createElement("input");
      checkboxEl.type = "checkbox";
      checkboxEl.classList.add("todo-checkbox");
      checkboxEl.checked = task.completed;
      itemEl.append(checkboxEl);

      checkboxEl.addEventListener("click", () => {
        if (checkboxEl.checked) {
          itemEl.classList.add("completed");
        } else {
          itemEl.classList.remove("completed");
        }

        updateLocalStorage();
      });

      const deleteButtonEl = document.createElement("button");
      deleteButtonEl.textContent = "remove";
      deleteButtonEl.classList.add("delete-button");
      itemEl.append(deleteButtonEl);

      deleteButtonEl.addEventListener("click", () => {
        itemEl.remove();
        updateLocalStorage();
      });
    });
  };

  const updateLocalStorage = () => {
    const tasks = Array.from(listEl.children).map((task) => ({
      text: task.querySelector("p").textContent,
      completed: task.querySelector(".todo-checkbox").checked,
    }));

    saveTasksToLocalStorage(tasks);
  };

  loadTasks();
};

todoList();

// Task 2

const audit = () => {
  const loginEl = document.querySelector(".audit-login");
  const passwordEl = document.querySelector(".audit-password");
  const enterButtonEl = document.querySelector("#enter");
  const registerButtonEl = document.querySelector("#register");
  const errorEl = document.querySelector(".audit-error");
  const correctEl = document.querySelector(".audit-correct");

  let savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser) {
    loginEl.value = savedUser.login;
    passwordEl.value = savedUser.password;
  }

  enterButtonEl.addEventListener("click", () => {
    const enteredLogin = loginEl.value;
    const enteredPassword = passwordEl.value;

    if (
      savedUser &&
      enteredLogin === savedUser.login &&
      enteredPassword === savedUser.password
    ) {
      correctEl.classList.remove("hidden");
      errorEl.classList.add("hidden");

      setTimeout(() => {
        errorEl.classList.add("hidden");
        correctEl.classList.add("hidden");
      }, 2000);
    } else {
      errorEl.classList.remove("hidden");
      correctEl.classList.add("hidden");

      setTimeout(() => {
        correctEl.classList.add("hidden");
        errorEl.classList.add("hidden");
      }, 2000);
    }
  });

  registerButtonEl.addEventListener("click", () => {
    const newLogin = loginEl.value;
    const newPassword = passwordEl.value;

    if (newLogin && newPassword) {
      saveUserToLocalStorage(newLogin, newPassword);
      savedUser = JSON.parse(localStorage.getItem("user"));
      correctEl.classList.remove("hidden");
      errorEl.classList.add("hidden");

      setTimeout(() => {
        errorEl.classList.add("hidden");
        correctEl.classList.add("hidden");
      }, 2000);
    } else {
      errorEl.classList.remove("hidden");
      correctEl.classList.add("hidden");

      setTimeout(() => {
        correctEl.classList.add("hidden");
        errorEl.classList.add("hidden");
      }, 2000);
    }
  });

  const saveUserToLocalStorage = (login, password) => {
    const user = {
      login,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));
  };
};

audit();

// Task 3

const bookmarks = () => {
  const formEl = document.querySelector(".bookmarks-form");
  const listEl = document.querySelector(".bookmarks-list");
  const nameInputEl = document.querySelector(".bookmarks-name");
  const urlInputEl = document.querySelector(".bookmarks-url");

  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  const saveBookmarks = () => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  const renderBookmarks = () => {
    listEl.innerHTML = ""; 

    bookmarks.forEach((bookmark, index) => {
      const item = document.createElement("li");
      listEl.prepend(item);

      const link = document.createElement("a");
      link.href = bookmark.url;
      link.textContent = bookmark.name;
      link.contentEditable = true;
      link.addEventListener("blur", () => {
        updateBookmarkName(index, link.textContent);
      });
      item.append(link);

      const controls = document.createElement("div");
      controls.classList.add("bookmarks-controls");
      item.append(controls);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        deleteBookmark(index);
      });
      controls.append(deleteButton);
    });
  };

  const addBookmark = (e) => {
    e.preventDefault(); 

    const name = nameInputEl.value;
    const url = urlInputEl.value;

    if (name && url) {
      bookmarks.push({ name, url });
      saveBookmarks();
      renderBookmarks();
      formEl.reset(); 
    }
  };

  const updateBookmarkName = (index, newName) => {
    if (newName.trim()) {
      bookmarks[index].name = newName.trim();
      saveBookmarks();
      renderBookmarks();
    }
  };

  const deleteBookmark = (index) => {
    bookmarks.splice(index, 1);
    saveBookmarks();
    renderBookmarks(); 
  };

  formEl.addEventListener("submit", addBookmark);

  renderBookmarks(); 
};

bookmarks();

// Task 4

const contacts = () => {
  const formEl = document.querySelector(".contact-form");
  const listEl = document.querySelector(".contacts-list");
  const firstNameInputEl = document.querySelector(".first-name");
  const lastNameInputEl = document.querySelector(".last-name");
  const phoneInputEl = document.querySelector(".phone");
  const emailInputEl = document.querySelector(".email");
  const titleEl = document.querySelector(".contacts-list-title");

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  const saveContacts = () => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const renderContacts = () => {
    listEl.innerHTML = ""; 

    contacts.forEach((contact, index) => {
      const item = document.createElement("li");
      item.classList.add("contact-item");

      const contactDetails = document.createElement("span");
      contactDetails.textContent = `${contact.firstName} ${contact.lastName} - ${contact.phone} - ${contact.email}`;
      contactDetails.contentEditable = true;
      contactDetails.addEventListener("blur", () => {
        updateContact(index, contactDetails.textContent);
      });
      item.append(contactDetails);

      const controls = document.createElement("div");
      controls.classList.add("contact-controls");
      item.append(controls);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteContact(index);
      });
      controls.append(deleteButton);

      listEl.append(item);
    });
  };

  const addContact = (e) => {
    e.preventDefault(); 

    const firstName = firstNameInputEl.value.trim();
    const lastName = lastNameInputEl.value.trim();
    const phone = phoneInputEl.value.trim();
    const email = emailInputEl.value.trim();

    if (firstName && lastName && phone && email) {
      const newContact = { firstName, lastName, phone, email };
      contacts.push(newContact);
      saveContacts();
      renderContacts();
      formEl.reset(); 

      titleEl.style.display = 'block'; 
    }
  };

  const updateContact = (index, newDetails) => {
    const [firstName, lastName, phone, email] = newDetails.split(" - ");
    if (firstName && lastName && phone && email) {
      contacts[index] = { firstName, lastName, phone, email };
      saveContacts();
      renderContacts();
    }
  };

  const deleteContact = (index) => {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  };

  formEl.addEventListener("submit", addContact);

  renderContacts();
};

contacts();
