/*
Each project data 
    1) Name
    2) Image
    3) Desc
    4) Tools Used
    5) Github code link/ Deployment Link-->
*/

//^ Function to fetch the project data from json file
function fetchProjectData() {
  return fetch("JS/Data/ProjectData.json").then((data) => {
    return data.json();
  });
}

//^ Function to display the project (by index)
function displayProject(id) {
  fetchProjectData().then((data) => {
    // First, clear any previously displayed project
    const projectsContainer = document.querySelector(".projects");
    projectsContainer.innerHTML = ""; // This clears all content inside the projects container

    // Find the project with the given id (index)
    const project = data.find((proj) => proj.id === id);

    if (project) {
      const pd = document.createElement("div");
      pd.classList.add("pd");

      //& Project Name
      const proName = document.createElement("h2");
      proName.textContent = project.name;
      proName.classList.add("proName");

      //& Project Image
      const imageTag = document.createElement("img");
      imageTag.src = project.image;
      imageTag.classList.add("proImage");

      //& Project Description
      const desc = document.createElement("p");
      desc.textContent = project.desc;
      desc.classList.add("proDesc");

      //&Tools
      const tools = document.createElement("ol");
      tools.classList.add("proToolsOL");
      const usedTools = project.tools;
      for (let i = 0; i < usedTools.length; i++) {
        const tool = document.createElement("li");
        tool.classList.add("proTool");
        tool.innerHTML = usedTools[i];
        tools.append(tool);
      }

      // Append the project to the container
      pd.append(imageTag, proName, desc, tools);
      projectsContainer.append(pd);
      //! INTERSECTION OBSERVER
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "w3-container",
              "w3-center",
              "w3-animate-left"
            );
          }
        });
      });

      // using proTool as the class as we are adding animation only to each individual tools
      observer.observe(document.querySelector(".proDesc"));
      observer.observe(document.querySelector(".proToolsOL"));
      observer.observe(document.querySelector(".proImage"));
      createLeftRightArrow();
    }
  });
}

//^ Function to create left and right arrows
// At the end of your Projects.js file, replace the existing code with:

let index = 1; // Initialize the first project index

// Display the first project initially
displayProject(index);

// Create navigation arrows

function createLeftRightArrow() {
  const arrowContainer = document.createElement("div");
  arrowContainer.classList.add("arrowContainer");

  const leftArrow = document.createElement("button");
  leftArrow.textContent = "<";
  leftArrow.classList.add("arrowButtons");

  const rightArrow = document.createElement("button");
  rightArrow.textContent = ">";
  rightArrow.classList.add("arrowButtons");

  // Add left and right arrows to the arrowContainer
  arrowContainer.appendChild(leftArrow);
  arrowContainer.appendChild(rightArrow);

  // Append arrowContainer to the projects section
  document.querySelector(".projects").appendChild(arrowContainer);
  // Left arrow click event
  leftArrow.addEventListener("click", () => {
    fetchProjectData().then((data) => {
      index = index === 1 ? data.length : index - 1;
      displayProject(index);
    });
  });

  // Right arrow click event
  rightArrow.addEventListener("click", () => {
    fetchProjectData().then((data) => {
      index = index === data.length ? 1 : index + 1;
      displayProject(index);
    });
  });
}
