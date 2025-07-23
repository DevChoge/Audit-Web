const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Audit contract", function () {
  let Audit, audit, owner, addr1, addr2;

 beforeEach(async function () {
  [owner, addr1, addr2] = await ethers.getSigners();
  Audit = await ethers.getContractFactory("Audit");
  audit = await Audit.deploy(); // 🔴 Remove `.deployed()` – it's unnecessary
});


  it("Should deploy successfully", async function () {
    expect(await audit.nextReportId()).to.equal(0);
  });

  it("Should allow adding a report", async function () {
    await audit.connect(addr1).addReport("Report A", "Details A");
    const report = await audit.getReport(0);
    expect(report.name).to.equal("Report A");
    expect(report.reporter).to.equal(addr1.address);
    expect(report.status).to.equal(0); // Pending
  });

  it("Should emit ReportAdded event", async function () {
    await expect(audit.connect(addr1).addReport("Report B", "Details B"))
      .to.emit(audit, "ReportAdded")
      .withArgs(0, addr1.address, "Report B");
  });

  it("Should allow deleting a report by reporter", async function () {
    await audit.connect(addr1).addReport("Report C", "Details C");
    await expect(audit.connect(addr1).deleteReport(0))
      .to.emit(audit, "ReportDeleted")
      .withArgs(0);
  });

  it("Should not allow deletion by non-reporter", async function () {
    await audit.connect(addr1).addReport("Report D", "Details D");
    await expect(
      audit.connect(addr2).deleteReport(0)
    ).to.be.revertedWith("Only reporter can delete");
  });

  it("Should update report status", async function () {
    await audit.connect(addr1).addReport("Report E", "Details E");
    await expect(audit.updateStatus(0, 1)) // 1 = Approved
      .to.emit(audit, "ReportStatusUpdated")
      .withArgs(0, 1);

    const report = await audit.getReport(0);
    expect(report.status).to.equal(1);
  });

  it("Should revert when updating non-existent report", async function () {
    await expect(audit.updateStatus(999, 2)).to.be.revertedWith("Invalid report ID");
  });
});
