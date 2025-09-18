I searched around and couldn’t find a published Swagger / OpenAPI spec file (JSON/YAML) for the Congress.gov API. The official docs refer to regular REST endpoints but don’t seem to host a swagger spec. ([The Library of Congress][1])

Here are some relevant info & ideas:

---

### What *is* available

* The Congress.gov API is version 3, supports JSON or XML responses. ([The Library of Congress][1])
* There’s a GitHub repository “LibraryOfCongress/api.congress.gov” that has documentation, examples, client libraries, etc. ([GitHub][2])
* There’s a Postman collection view of the API: “Congress.gov API | Documenter” at Postman. ([documenter.getpostman.com][3])

---

### What you can try / possible URL

Since there’s no known published Swagger spec URL, you could try a few approaches:

1. **Look in the GitHub repo**
   Often the spec file can live in the repo, maybe named `openapi.json`, `swagger.json`, or similar.
   → Check the contents of `LibraryOfCongress/api.congress.gov` repo. ([GitHub][2])

2. **Generate one from Postman**
   Use the Postman public collection (which they have) and export it as OpenAPI / Swagger spec. That may give you a spec you can download. ([documenter.getpostman.com][3])

3. **Contact the maintainers / API team**
   If you need an official version of the spec, the LOC API team might provide one on request via GitHub issues. ([The Library of Congress][1])

---

If you want, I can try to track down a working spec file or a URL to download it, or even assemble one from the docs/postman. Do you want me to try that?

[1]: https://www.loc.gov/apis/additional-apis/congress-dot-gov-api/?utm_source=chatgpt.com "Congress.gov API | Additional APIs and Data Services"
[2]: https://github.com/LibraryOfCongress/api.congress.gov?utm_source=chatgpt.com "LibraryOfCongress/api.congress.gov"
[3]: https://documenter.getpostman.com/view/6803158/VV56LCkZ?utm_source=chatgpt.com "Congress.gov API"
