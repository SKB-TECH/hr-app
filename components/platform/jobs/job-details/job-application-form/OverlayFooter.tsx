export default function OverlayFooter() {
  return (
    <div className="apply-overlay__footer">
      <button type="button" className="apply-overlay__submit">
        Submit Application
      </button>
      <p className="apply-overlay__terms">
        By sending the request you can confirm that you accept our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
      </p>
    </div>
  );
}