const axios = require("axios");

let GITHUB_API = "https://api.github.com";
let OWNER = "hashim-sohail";
let REPO = "release-test";

let headers = {
  Authorization: "e168eb221f63ad9166db295539a9fa9d631ad085"
};

async function listWorkflows(repo) {
  console.log(`${GITHUB_API}/repos/${OWNER}/${repo}/actions/workflows`);

  try {
    const { data } = await axios.get(
      `${GITHUB_API}/repos/${OWNER}/${repo}/actions/workflows`,
      {
        headers
      }
    );
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e.response.data);
  }
}

async function listWorkFlowRuns(repo, workflow_id) {
  console.log(
    `${GITHUB_API}/repos/${OWNER}/${repo}/actions/${workflow_id}/runs`
  );

  try {
    const { data } = await axios.get(
      `${GITHUB_API}/repos/${OWNER}/${repo}/actions/${workflow_id}/runs`,
      {
        headers
      }
    );
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e.response.data);
  }
}

const initiateKill = async (req, res) => {
  console.log("i am in function");
  try {
    const workflows = await listWorkflows(REPO);
    for (let workflow of workflows.workflows) {
      console.log("calling workflow", workflow.id);

      try {
        const run = await listWorkFlowRuns(REPO, workflow.id);
        console.log(run);
      } catch (e) {}
    }
  } catch (e) {}
};

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/killWorkflows", function(req, res) {
  console.log("query", req.query);
  initiateKill(req, res);
  res.ok();
});

app.listen(3000, function() {
  console.log("Started on PORT 3000");
});
