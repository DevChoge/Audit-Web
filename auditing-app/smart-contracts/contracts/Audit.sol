// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Audit {
    enum Status { Pending, Approved, Flagged }

    struct Report {
        uint id;
        string name;
        string details;
        address reporter;
        uint timestamp;
        Status status;
    }

    uint public nextReportId;
    mapping(uint => Report) public reports;

    event ReportAdded(uint id, address indexed reporter, string name);
    event ReportDeleted(uint id);
    event ReportStatusUpdated(uint id, Status newStatus);

    function addReport(string memory name, string memory details) public {
        reports[nextReportId] = Report({
            id: nextReportId,
            name: name,
            details: details,
            reporter: msg.sender,
            timestamp: block.timestamp,
            status: Status.Pending
        });

        emit ReportAdded(nextReportId, msg.sender, name);
        nextReportId++;
    }

    function deleteReport(uint id) public {
        require(id < nextReportId, "Invalid report ID");
        require(reports[id].reporter == msg.sender, "Only reporter can delete");

        delete reports[id];
        emit ReportDeleted(id);
    }

    function updateStatus(uint id, Status newStatus) public {
        require(id < nextReportId, "Invalid report ID");
        // In real life, restrict this to an auditor or admin
        reports[id].status = newStatus;
        emit ReportStatusUpdated(id, newStatus);
    }

    function getReport(uint id) public view returns (Report memory) {
        require(id < nextReportId, "Invalid report ID");
        return reports[id];
    }
}
