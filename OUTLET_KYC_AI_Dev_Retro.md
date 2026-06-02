  **AI-Assisted Feature Retrospective**  
  *Fill this in together as a team — takes \~20 minutes*

| Feature |  Outlet KYC | Date |   |
| :---- | :---- | :---- | :---- |
| **Team Members** | [team.dms@evolveasia.co](mailto:team.dms@evolveasia.co) | **Iteration \#** |  1 |

**PART 1  —  Everyone fills in their row**

*Add your name and a short honest answer for each question. No long explanations needed — a sentence or two is enough.*

**1\.  What did the AI tool do well on this feature?**

*Be specific — name the task or the file, not just 'it was fast'*

| Team Member | Response |
| :---- | :---- |
|  [Nirdesh Pokharel](mailto:nirdesh@evolveasia.co) | It quickly created the KYC module's resolver, controller, service, database schema and graphQL schema. This saved a lot of time on repetitive boilerplate code. |
|  [Ayusha Pradhan](mailto:ayusha@evolveasia.co) |  It build the KYC approvals module by generating the list/detail views, controllers, table configuration, and approval flow logic. It quickly debugged and fixed the PhotoSwipe image preview issue by wiring handlers correctly, normalizing image data, and updating the ImageColumn component, saving significant time on repetitive setup and troubleshooting. |
|  [Prawesh Panthi](mailto:prawesh@evolveasia.co) |  |
|  [Prabin Sharma Thakur](mailto:prabin@evolveasia.co) | It helped me build the KYC configuration page much faster than usual. The basic setup for the Enable KYC switch, payment terms, SubD selection, and the document tables was done quickly, so I did not have to start everything from scratch.  |
|  [Shreeyana Kadel](mailto:shreeyana@evolveasia.co) | It helped me quickly set up the KYC page interactions and test flow logic, which saved time on repetitive selector work. |
|  |  |

**2\.  Where did the AI tool let you down or cause extra work?**

*What did you have to fix, redo, or throw away?*

| Team Member | Response |
| :---- | :---- |
|  [Nirdesh Pokharel](mailto:nirdesh@evolveasia.co) |  It did not follow project conventions. It tried to write migrations itself instead of using migration commands, and made the permission logic more complex than it needed to be. I had to simplify it later. |
|  [Ayusha Pradhan](mailto:ayusha@evolveasia.co) | I had to redo most of the styling for the KYC module because the initial UI generated did not fully match the provided design and layout requirements. I also had to rewrite parts of the GraphQL queries and mutations to align with the actual backend structure and business logic. |
|  [Prawesh Panthi](mailto:prawesh@evolveasia.co) |   |
|  [Prabin Sharma Thakur](mailto:prabin@evolveasia.co) | I had to keep fixing the CSS layout for the Credit/Cash alignment, SubD list, bulk select alignment, checkbox spacing, and the document tables too. Most of the CSS was not coming out right, so I had to fix a lot of it myself. |
|  [Shreeyana Kadel](mailto:shreeyana@evolveasia.co) | The generated selectors were brittle and required manual correction to match the actual page structure, which added extra debugging work. |

**3\.  What prompt or approach worked best for you?**

*Share the pattern so others can copy it — e.g. 'I gave it the existing interface first, then asked for the implementation'*

| Team Member | Response |
| :---- | :---- |
|  [Nirdesh Pokharel](mailto:nirdesh@evolveasia.co) |  Showing it a similar existing code module first, then asking it to follow the same pattern for KYC. |
|  [Ayusha Pradhan](mailto:ayusha@evolveasia.co) |  I asked it to take reference from existing code structure and make changes for KYC |
|  [Prawesh Panthi](mailto:prawesh@evolveasia.co) |   |
|  [Prabin Sharma Thakur](mailto:prabin@evolveasia.co) | What worked best was showing it an existing reference and asking it to follow the same pattern. |
|  [Shreeyana Kadel](mailto:shreeyana@evolveasia.co) | Providing the actual live page structure first and validating selectors before asking for generated code worked best. |

**4\.  What's one thing you'd do differently next time?**

*One change per person — concrete and actionable*

| Team Member | Response |
| :---- | :---- |
|  [Nirdesh Pokharel](mailto:nirdesh@evolveasia.co) |  Write down the project’s conventions (migrations, permissions, file structures) [AGENTS.MD](http://AGENTS.MD) or [CLAUDE.MD](http://CLAUDE.MD) file before starting, so the AI does not guess and create extra work. |
|  [Ayusha Pradhan](mailto:ayusha@evolveasia.co) |  Next time, I would first provide AI with the exact design reference and existing GraphQL patterns before generating code. |
|  [Prawesh Panthi](mailto:prawesh@evolveasia.co) |   |
|  [Prabin Sharma Thakur](mailto:prabin@evolveasia.co) | Next time I would share the exact figma layout styling details from the beginning for CSS, so there is less manual work to do. |
|  [Shreeyana Kadel](mailto:shreeyana@evolveasia.co) | I would start by validating live selectors first and then use AI to implement the matching flow. |

**PART 2  —  Quick team vote (tick your number)**

*1 \= strongly disagree    5 \= strongly agree    Each person ticks their own column or you agree on a team score*

| Question | 1 | 2 | 3 | 4 | 5 | Notes |
| :---- | :---: | :---: | :---: | :---: | :---: | :---- |
| The AI tool saved us real time | ☐ | ☐ | ☐ | ☐ | ☐ |   |
| The output quality was good enough to use | ☐ | ☐ | ☐ | ☐ | ☐ |   |
| We caught AI mistakes before they caused problems | ☐ | ☐ | ☐ | ☐ | ☐ |   |
| Our prompts got better as we went | ☐ | ☐ | ☐ | ☐ | ☐ |   |
| I'd use this approach again on the next feature | ☐ | ☐ | ☐ | ☐ | ☐ |   |

**PART 3  —  Facilitator fills in after the discussion (one person)**

*Synthesise Part 1 responses into short team-level takeaways. This is what gets carried forward.*

| ✅  Keep Doing | 🛑  Stop Doing | 🔄  Try Next Time |
| :---- | :---- | :---- |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |

**Top 3 changes for next feature**

| \# | What we will change | Owner | By when |
| :---: | :---- | :---- | :---- |
| **1** |   |   |   |
| **2** |   |   |   |
| **3** |   |   |   |

  *Carry the 'Top 3 changes' into the next feature's kick-off. That's the only way this loop closes.*