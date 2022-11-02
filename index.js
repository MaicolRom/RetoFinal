import {
    saveStudent,
    onGetStudent,
    deleteStudent, 
    getStudent,
    updateStudent,
    saveEnrollment,
    onGetEnrollment,
    deleteEnrollment,
    getEnrollment,
    updateEnrollment,
    saveClass,
    onGetClass,
    deleteClass,
    getClass,
    updateClass
} from "./firebase.js";

const studensForm = document.getElementById("students-form");
const studentsContainer = document.getElementById("estudiantes-container");

const classForm = document.getElementById("class-form");
const classContainer = document.getElementById("class-container");

const enrollmentForm = document.getElementById("enrollment-form");
const enrollmentContainer = document.getElementById("enrollment-container");

let editStatus = false;
//let id = "";
let id = "";

window.addEventListener("DOMContentLoaded", async(e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });

   
    onGetClass((querySnapshot) => {
        classContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const clase = doc.data();

            classContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${"Título: " + clase.title}</h3>
        <p>${"Descripción: " + clase.description}</p>
        <p>${"Id: " + doc.id}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">
            🗑 Delete
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            ✏️ Edit
          </button>
        </div>
      </div>`;
        });

        const btnsDelete = classContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async ({target: {dataset}}) => {
                try {
                    await deleteClass(dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        );

        const btnsEdit = classContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getClass(e.target.dataset.id);
                    const clase = doc.data();
                    classForm["clases-title"].value = clase.title;
                    classForm["clases-description"].value = clase.description;

                    editStatus = true;
                    id = doc.id;
                    classForm["btn-clases-form"].innerText = "Actualizar";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });

onGetStudent((querySnapshot) => {
        studentsContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const student = doc.data();
            console.log(student);

            studentsContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${student.name + ' ' + student.name}</h3>
        <p>${"Id: " + doc.id}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">
            🗑 Delete
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            ✏️ Edit
          </button>
        </div>
      </div>`;
        });

        const btnsDelete = studentsContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async ({target: {dataset}}) => {
                try {
                    await deleteStudent(dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        );

        const btnsEdit = studentsContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getStudent(e.target.dataset.id);
                    const students = doc.data();
                    studensForm["student-name"].value = student.name;
                    studensForm["student-last-name"].value = students.lastname;

                    editStatus = true;
                    id = doc.id;
                    studensForm["btn-students-form"].innerText = "Actualizar";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });

});

onGetEnrollment((querySnapshot) => {
    enrollmentContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const enrollment = doc.data();

        enrollmentContainer.innerHTML += `
  <div class="card card-body mt-2 border-primary">
    <h3 class="h5">${"Matricula: " + doc.id}</h3>
    <p>${"Estudiante con ID: " + enrollment.Id_student}</p>
    <p>${"Clase ID: " + enrollment.Id_class}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        ✏️ Edit
      </button>
    </div>
  </div>`;
    });

    const btnsDelete = enrollmentContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({target: {dataset}}) => {
            try {
                await deleteEnrollment(dataset.id);
            } catch (error) {
                console.log(error);
            }
        })
    );

    const btnsEdit = enrollmentContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            try {
                const doc = await getEnrollment(e.target.dataset.id);
                const enrollment = doc.data();
                matriculasForm["id-student"].value = enrollment.Id_student;
                matriculasForm["id-class"].value = enrollment.Id_class;
                editStatus = true;
                id = doc.id;
                enrollmentForm["btn-erollment-form"].innerText = "Actualizar";
            } catch (error) {
                console.log(error);
            }
        });
    });
});

classForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = classForm["class-title"];
    const description = classForm["class-description"];

    try {
        if (!editStatus) {
            await saveClass(title.value,description.value);
        } else {
            await updateClass(id, {
                title: title.value,
                description: description.value,
            });

            editStatus = false;
            id = "";
            classForm["btn-class-form"].innerText = "Guardar";
        }

        classForm.reset();
        title.focus();
    } catch (error) {
        console.log(error);
    }
});

studensForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = studensForm["student-name"];
    const lastname = studensForm["student-last-name"];

    try {
        if (!editStatus) {
            await saveStudent(name.value, lastname.value);
        } else {
            await updateStudent(id, {
                name: name.value,
                lastname: lastname.value,
            });

            editStatus = false;
            id = "";
            studensForm["btn-students-form"].innerText = "Guardar";
        }

        studensForm.reset();
        nombre.focus();
    } catch (error) {
        console.log(error);
    }});

enrollmentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const Id_student = enrollmentForm["id-student"];
        const Id_class = enrollmentForm["id-class"];
        try {
            if (!editStatus) {
                await saveEnrollment(Id_student.value, Id_class.value);
                alert("Matricula realizada");
            } else {
                await updateEnrollment(id, {
                    Id_estudiante: Id_student.value,
                    Id_clase: Id_class.value,
                });
    
                editStatus = false;
                id = "";
                enrollmentForm["btn-enrollment-form"].innerText = "Matricular";
            }
    
            enrollmentForm.reset();
            Id_student.focus();
        } catch (error) {
            console.log(error);
        }
    });