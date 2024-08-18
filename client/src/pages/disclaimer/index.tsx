const TermsAndConditions = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          color: "#004d00",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        Terms and Conditions
      </h1>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#003300", fontSize: "20px", }}>Disclaimer</h2>
        <ul style={{ lineHeight: "1.6" }}>
          <li>
            <strong>Governmental Priority:</strong> Only governmental
            organizations are automatically eligible for registration. Other
            bodies may be considered if they apply for a side event slot.
          </li>
          <li>
            <strong>Organizational Representation:</strong> Registration must be
            completed through a recognized organization; individual applications
            are not permitted.
          </li>
          <li>
            <strong>Mandate Alignment:</strong> The organization must have a
            clear mandate or mission aligned with climate change, sustainable
            development, or related issues, in line with national climate
            policies, the UNFCCC's goals, and the specific objectives of COP29.
          </li>
          <li>
            <strong>Limited Delegation:</strong> In compliance with Federal
            Government directives, organizations may submit a maximum of two
            participants for accreditation. Up to two additional participants
            may be considered for organizations hosting side events.
          </li>
          <li>
            <strong>Financial Responsibility:</strong> Participating
            organizations are responsible for covering all expenses related to
            their representatives’ participation in COP29.
          </li>
          <li>
            <strong>Fee for Side Events:</strong> Hosting a side event at COP29
            Nigeria’s Pavilion requires payment of a fee. Details can be found
            in the side event application section.
          </li>
          <li>
            <strong>Mandatory Reporting:</strong> Organizations must submit a
            detailed report on the sessions and events attended, contributing to
            a national COP report.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#003300", fontSize: "20px",}}>Guidance on How to Register</h2>
        <ul style={{ lineHeight: "1.6" }}>
          <li>
            <strong>Eligibility:</strong> Ensure your organization is
            governmental or has a mission aligned with climate change and
            sustainable development. Non-governmental bodies should apply via
            the side event application process.
          </li>
          <li>
            <strong>Application Submission:</strong> Complete your application
            through your organization, not as an individual.
          </li>
          <li>
            <strong>Delegation Size:</strong> Limit your delegation to two
            participants. If hosting a side event, you may apply for
            accreditation for up to two additional participants.
          </li>
          <li>
            <strong>Side Event Application:</strong> If your organization
            intends to host a side event, complete the side event form and
            prepare to cover the associated fees.
          </li>
          <li>
            <strong>Pre-COP29 Workshop:</strong> Ensure your accredited
            participants attend the orientation and pre-COP29 workshop organized
            by the NCCC.
          </li>
          <li>
            <strong>Post-COP Report:</strong> After COP29, submit a
            comprehensive report of your organization’s participation, endorsed
            by your organization's Head, to the NCCC.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default TermsAndConditions;
