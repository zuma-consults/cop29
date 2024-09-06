const TermsAndConditions = () => {
  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          color: "red",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        IMPORTANT NOTICE
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          marginBottom: "20px",
          color: "red",
        }}
      >
        Accreditation for UNFCCC COP29 will close on October 25, 2024.
      </p>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#003300", fontSize: "20px" }}>
          Presidential Directive
        </h2>
        <p style={{ lineHeight: "1.6" }}>
          In accordance with the directive issued by President Bola Ahmed Tinubu
          on August 21, 2024, to establish a Climate Accountability and
          Transparency Platform and other measures to ensure efficiency and
          accountability in the nation's participation in the 29th UN Climate
          Change Conference (COP 29) in Baku, Azerbaijan, all prospective
          members of the Federal government’s UNFCCC COP29 delegation are
          hereby notified that accreditation requests are subject to
          Presidential approval.
        </p>
        <p style={{ lineHeight: "1.6" }}>
          Consequently, approvals will be granted only to individuals or
          organizations that can clearly demonstrate that their participation
          aligns with the theme for Nigeria, "Actualizing Financial Commitments
          for Climate Action." Furthermore, the participation must have an
          economic imperative and be directed toward engaging with companies,
          multilateral partners, and stakeholders who will attract finance and
          opportunities to Nigeria.
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#003300", fontSize: "20px" }}>
          Required Documentation
        </h2>
        <p style={{ lineHeight: "1.6" }}>
          All prospective delegation members are hereby required to upload
          relevant supporting documents such as invitation letters or
          correspondence to confirm:
        </p>
        <ul style={{ lineHeight: "1.6", marginLeft: "20px", listStyleType: "disc" }}>
          <li style={{ marginBottom: "10px" }}>Participation is directly linked to high-level conversations to be held at COP 29, such as ongoing negotiations.</li>
          <li style={{ marginBottom: "10px" }}>Signing of bilateral agreements and MoUs to concretize financial commitments.</li>
          <li style={{ marginBottom: "10px" }}>Participation in thematic meetings as a representative of Nigeria.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#003300", fontSize: "20px" }}>
          Additional Guidelines
        </h2>
        <ul style={{ lineHeight: "1.6", marginLeft: "20px", listStyleType: "decimal" }}>
          <li style={{ marginBottom: "10px" }}>
            Approvals will be granted strictly on merit, and full-and-real-time
            access into the data concerning who is attending and those the
            government is sponsoring to COP 29 will also be made available to
            the general public on the Climate Accountability and Transparency
            Portal (CAT-P) to ensure transparency.
          </li>
          <li style={{ marginBottom: "10px" }}>
            The Nigeria delegation is to efficiently utilize the on-site
            delegation office within the conference complex to host high-level
            meetings and bilaterals. Members of the delegation will therefore be
            required to schedule meetings ahead with the time-slotting system
            provided on the portal.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#003300", fontSize: "20px" }}>Disclaimer</h2>
        <ul style={{ lineHeight: "1.6", marginLeft: "20px", listStyleType: "decimal" }}>
          <li style={{ marginBottom: "10px" }}>
            <strong>Governmental Priority:</strong> Only government
            organizations are automatically eligible for registration. Other
            bodies such as CSOs, NGOs may qualify if their reason for
            participation is aligned with the theme for Nigeria, "Actualizing
            Financial Commitments for Climate Action," and the objective of
            their participation has an economic imperative and is directed
            toward engaging with companies, multilateral partners, and
            stakeholders who will attract finance and opportunities to Nigeria.
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Organizational Representation:</strong> Registration must
            be completed through a recognized organization; individual
            applications are not permitted.
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Mandate Alignment:</strong> The organization must have a
            clear mandate or mission aligned with climate change, sustainable
            development, or related issues, in line with national climate
            policies, the UNFCCC's goals, and the specific objectives of COP29.
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Limited Delegation:</strong> In compliance with Federal
            Government directives, organizations may submit a maximum of two
            participants for accreditation.
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Financial Responsibility:</strong> Participating
            organizations are responsible for covering all expenses related to
            their representatives’ participation in the UNFCCC COP29.
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Mandatory Reporting:</strong> By registering to participate
            in COP29, organizations commit to submitting a comprehensive report
            detailing sessions, events, and outcomes of their participation,
            which will form part of the final COP29 national report.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#003300", fontSize: "20px" }}>
          Guidance on How to Register
        </h2>
        <ul style={{ lineHeight: "1.6", marginLeft: "20px", listStyleType: "decimal" }}>
          <li style={{ marginBottom: "10px" }}>
            <strong>Eligibility:</strong> Ensure your organization is
            governmental or has a mission aligned with climate change and
            sustainable development. Non-governmental bodies should apply via
            the side event application process.
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Application Submission:</strong> Complete your application
            through your organization, not as an individual.
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Delegation Size:</strong> Limit your delegation to two
            participants. If hosting a side event, you may apply for
            accreditation for up to two additional participants.
          </li>
          {/* <li style={{ marginBottom: "10px" }}>
            <strong>Side Event Application:</strong> If your organization
            intends to host a side event, complete the side event form and
            prepare to cover the associated fees.
          </li> */}
          <li style={{ marginBottom: "10px" }}>
            <strong>Pre-COP29 Workshop:</strong> Ensure your accredited
            participants attend the orientation and pre-COP29 workshop organized
            by the NCCC.
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Post-COP Report:</strong> After COP29, a comprehensive
            report detailing sessions, events, and outcomes, endorsed by the
            organization's Head, must be submitted to the National Council on
            Climate Change.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default TermsAndConditions;
