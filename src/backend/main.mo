import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type AuditStatus = { #pending; #scanning; #complete };

  type FindingCategory = {
    #illegal_clause;
    #hidden_cost;
    #tenant_responsibility;
  };

  type Audit = {
    id : Nat;
    timestamp : Time.Time;
    leaseName : Text;
    status : AuditStatus;
  };

  type Finding = {
    category : FindingCategory;
    title : Text;
    clauseExcerpt : Text;
    explanation : Text;
  };

  type UserProfile = {
    displayName : Text;
    plan : Text;
  };

  module Audit {
    public func compare(a1 : Audit, a2 : Audit) : Order.Order {
      Nat.compare(a1.id, a2.id);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextAuditId = 1;

  let audits = Map.empty<Principal, List.List<Audit>>();
  let auditOwners = Map.empty<Nat, Principal>();
  let findings = Map.empty<Nat, List.List<Finding>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public shared ({ caller }) func init() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can initialize demo data");
    };

    let demoAudit : Audit = {
      id = nextAuditId;
      timestamp = Time.now();
      leaseName = "Sample Lease";
      status = #complete;
    };

    let demoFinding : Finding = {
      category = #illegal_clause;
      title = "Unlawful Penalty Clause";
      clauseExcerpt = "Any late payment will result in a $500 penalty.";
      explanation = "Local law caps late fees at $50. This exceeds that limit and is illegal.";
    };

    let demoProfile : UserProfile = {
      displayName = "Demo User";
      plan = "free";
    };

    let auditList = List.empty<Audit>();
    auditList.add(demoAudit);
    audits.add(caller, auditList);
    auditOwners.add(demoAudit.id, caller);

    let findingList = List.empty<Finding>();
    findingList.add(demoFinding);
    findings.add(demoAudit.id, findingList);

    userProfiles.add(caller, demoProfile);

    nextAuditId += 1;
  };

  public shared ({ caller }) func createAudit(leaseName : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create audits");
    };

    let audit : Audit = {
      id = nextAuditId;
      timestamp = Time.now();
      leaseName;
      status = #pending;
    };

    let userAudits = switch (audits.get(caller)) {
      case (null) { List.empty<Audit>() };
      case (?existing) { existing };
    };

    userAudits.add(audit);
    audits.add(caller, userAudits);
    auditOwners.add(nextAuditId, caller);

    let profile = switch (userProfiles.get(caller)) {
      case (null) {
        {
          displayName = "New User";
          plan = "free";
        };
      };
      case (?existing) { existing };
    };
    userProfiles.add(caller, profile);

    let auditId = nextAuditId;
    nextAuditId += 1;
    auditId;
  };

  public query ({ caller }) func getAuditHistory() : async [Audit] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view audit history");
    };

    switch (audits.get(caller)) {
      case (null) { [].values().toArray() };
      case (?userAudits) { userAudits.reverse().toArray() };
    };
  };

  public query ({ caller }) func getAuditFindings(auditId : Nat) : async [Finding] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view audit findings");
    };

    switch (auditOwners.get(auditId)) {
      case (null) {
        Runtime.trap("Audit not found");
      };
      case (?owner) {
        if (caller != owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view findings for your own audits");
        };
      };
    };

    switch (findings.get(auditId)) {
      case (null) { [] };
      case (?auditFindings) { auditFindings.reverse().toArray() };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };

    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };

    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func updateUserPlan(plan : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update subscription plan");
    };

    let profile = switch (userProfiles.get(caller)) {
      case (null) {
        {
          displayName = "New User";
          plan = "free";
        };
      };
      case (?existing) { existing };
    };
    let updatedProfile = {
      displayName = profile.displayName;
      plan;
    };
    userProfiles.add(caller, updatedProfile);
  };

  module AuditList {
    public func fromList(audits : List.List<Audit>) : List.List<Audit> {
      audits;
    };
  };
};
