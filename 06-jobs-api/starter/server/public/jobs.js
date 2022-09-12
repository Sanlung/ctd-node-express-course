const buildJobsTable = async (jobsTable, jobsTableHeader, token, message) => {
  // section A
  try {
    const response = await fetch("/api/v1/jobs", {
      method: "GET",
      headers: {
        "Content-Type": "application-json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    const children = [jobsTableHeader];
    if (response.status === 200) {
      if (data.count === 0) {
        jobsTable.replaceChildren(...children);
        return 0;
      } else {
        for (let i = 0; i < data.count; i++) {
          let editButton = `<td><button type="button" class="edit-button" data-id=${data.jobs[i]._id}>Edit</button></td>`;
          let deleteButton = `<td><button type="button" class="delete-button" data-id=${data.jobs[i]._id}>Delete</button></td>`;
          let rowHTML = `<td>${data.jobs[i].company}</td><td>${data.jobs[i].position}</td><td>${data.jobs[i].status}</td>${editButton}${deleteButton}`;
          let rowEntry = document.createElement("tr");
          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        jobsTable.replaceChildren(...children);
      }
      return data.count;
    } else {
      message.textContent = data.msg;
      return 0;
    }
  } catch (err) {
    message.textContent = "A communications error occurred";
    return 0;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const logout = document.getElementById("logout");
  const message = document.getElementById("message");
  const loginRegister = document.getElementById("login-register");
  const login = document.getElementById("login");
  const register = document.getElementById("register");
  const loginDiv = document.getElementById("login-div");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const loginButton = document.getElementById("login-button");
  const loginCancel = document.getElementById("login-cancel");
  const registerDiv = document.getElementById("register-div");
  const name = document.getElementById("name");
  const email1 = document.getElementById("email1");
  const password1 = document.getElementById("password1");
  const password2 = document.getElementById("password2");
  const registerButton = document.getElementById("register-button");
  const registerCancel = document.getElementById("register-cancel");
  const jobs = document.getElementById("jobs");
  const jobsTable = document.getElementById("jobs-table");
  const jobsTableHeader = document.getElementById("jobs-table-header");
  const addJob = document.getElementById("add-job");
  const editJob = document.getElementById("edit-job");
  const company = document.getElementById("company");
  const position = document.getElementById("position");
  const status = document.getElementById("status");
  const addingJob = document.getElementById("adding-job");
  const jobsMessage = document.getElementById("jobs-message");
  const editCancel = document.getElementById("edit-cancel");

  // section 2
  let showing = loginRegister;
  let token = null;

  document.addEventListener("startDisplay", async (e) => {
    showing = loginRegister;
    token = localStorage.getItem("token");
    if (token) {
      logout.style.display = "block";
      const count = await buildJobsTable(
        jobsTable,
        jobsTableHeader,
        token,
        message
      );
      if (count > 0) {
        jobsMessage.textContent = "";
        jobsTable.style.display = "block";
      } else {
        jobsMessage.textContent = "There are no jobs to display for this user";
        jobsTable.style.display = "none";
      }
      jobs.style.display = "block";
      showing = jobs;
    } else {
      loginRegister.style.display = "block";
    }
  });

  const customEvent = new Event("startDisplay");
  document.dispatchEvent(customEvent);
  let suspendInput = false;

  // section 3
  document.addEventListener("click", async (e) => {
    if (suspendInput) {
      return;
    }

    if (e.target.nodeName === "BUTTON") {
      message.textContent = "";
    }

    if (e.target === logout) {
      localStorage.removeItem("token");
      token = null;
      logout.style.display = "none";
      showing.style.display = "none";
      loginRegister.style.display = "block";
      showing = loginRegister;
      jobsTable.replaceChildren(jobsTableHeader);
      message.textContent = "You are logged out";
    } else if (e.target === login) {
      showing.style.display = "none";
      loginDiv.style.display = "block";
      showing = loginDiv;
    } else if (e.target === register) {
      showing.style.display = "none";
      registerDiv.style.display = "block";
      showing = registerDiv;
    } else if (e.target === loginCancel || e.target === registerCancel) {
      showing.style.display = "none";
      loginRegister.style.display = "block";
      showing = loginRegister;
      email.value = "";
      password.value = "";
      name.value = "";
      email1.value = "";
      password1.value = "";
      password2.value = "";
    } else if (e.target === loginButton) {
      suspendInput = true;
      try {
        const response = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: email.value, password: password.value}),
        });
        const data = await response.json();

        if (response.status === 200) {
          message.textContent = `Login successful. Welcome ${data.user.name}`;
          token = data.token;
          localStorage.setItem("token", token);
          showing.style.display = "none";
          email.value = "";
          password.value = "";
          document.dispatchEvent(customEvent);
        } else {
          message.textContent = data.msg;
        }
      } catch (err) {
        message.textContent = "A communications error occurred.";
      }
      suspendInput = false;
    } else if (e.target === registerButton) {
      if (password1.value !== password2.value) {
        message.textContent = "The passwords entered do not match";
      } else {
        suspendInput = true;
        try {
          const response = await fetch("/api/v1/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name.value,
              email: email1.value,
              password: password1.value,
            }),
          });
          const data = await response.json();

          if (response.status === 201) {
            message.textContent = `Registration successful. Welcome ${data.user.name}`;
            token = data.token;
            localStorage.setItem("token", token);
            showing.style.display = "none";
            document.dispatchEvent(customEvent);
            name.value = "";
            email.value = "";
            password1 = "";
            password2 = "";
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          message.textContent = "A communications error occurred";
        }
        suspendInput = false;
      }
    } //section 4

    if (e.target === addJob) {
      showing.style.display = "none";
      editJob.style.display = "block";
      showing = editJob;
      delete editJob.dataset.id;
      company.value = "";
      position.value = "";
      status.value = "pending";
      addingJob.textContent = "Add";
    } else if (e.target === editCancel) {
      showing.style.display = "none";
      company.value = "";
      position.value = "";
      status.value = "pending";
      document.dispatchEvent(customEvent);
    } else if (e.target === addingJob) {
      if (!editJob.dataset.id) {
        // new job
        suspendInput = true;
        try {
          const response = await fetch("/api/v1/jobs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              company: company.value,
              position: position.value,
              status: status.value,
            }),
          });
          const data = await response.json();

          if (response.status === 201) {
            message.textContent = "The job entry was created";
            showing.style.display = "none";
            document.dispatchEvent(customEvent);
            company.value = "";
            position.value = "";
            status.value = "pending";
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          message.textContent = "A communications error occurred";
        }
        suspendInput = false;
      } else {
        // edit job
        suspendInput = true;
        try {
          const jobID = editJob.dataset.id;
          const response = await fetch(`/api/v1/jobs/${jobID}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              company: company.value,
              position: position.value,
              status: status.value,
            }),
          });
          const data = await response.json();

          if (response.status === 200) {
            message.textContent = "The job entry was updated";
            showing.style.display = "none";
            company.value = "";
            position.value = "";
            status.value = "pending";
            document.dispatchEvent(customEvent);
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          message.textContent = "A communications error occurred";
        }
        suspendInput = false;
      } // section 5
    } else if (e.target.className === "edit-button") {
      editJob.dataset.id = e.target.dataset.id;
      suspendInput = true;
      try {
        const response = await fetch(`/api/v1/jobs/${e.target.dataset.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.status === 200) {
          company.value = data.job.company;
          position.value = data.job.position;
          status.value = data.job.status;
          addingJob.textContent = "Update";
          showing.style.display = "none";
          editJob.style.display = "block";
          showing = editJob;
          message.textContent = "";
        } else {
          message.textContent = "The job entry was not found";
          document.dispatchEvent(customEvent);
        }
      } catch (err) {
        message.textContent = "A communications error occurred";
      }
      suspendInput = false;
      // DELETE action
    } else if (e.target.className === "delete-button") {
      suspendInput = true;
      try {
        const response = await fetch(`/api/v1/jobs/${e.target.dataset.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.status === 200) {
          message.textContent = data.msg;
          document.dispatchEvent(customEvent);
        } else {
          message.textContent = data.msg;
        }
      } catch (err) {
        message.textContent = "A communications error occurred";
      }
      suspendInput = false;
    }
  });
});
