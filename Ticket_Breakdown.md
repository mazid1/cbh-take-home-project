# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Create Facility_agent join table
- This join table should have these columns:
  - facility_id
  - agent_id
  - custom_id (varchar)

This `custom_id` field will be used as the cusom ID for the facility.    
Estimated time: 4 hours

### Refactor `getShiftsByFacility` function to get `custom_id` with it
- This get method should get data by joining Facilities, Agents, Shifts and Facility_agent table
- Along with other necessary data it should get the `custom_id` from the `Facility_agent` table

Estimated time: 4 hours

### Generate Report with custom_id
- When generate the report PDF, use `custom_id` (if available) as the Agent_id
- If custom_id is not available then show the original agent_id.

Estimated time: 4 hours    
Acceptance criteria: If custom_id available then it should be visible, but if there is no custom_id then the original agent_id should be visible.
