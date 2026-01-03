export function getGuestId() {
  let guestId = sessionStorage.getItem("guest_id");
  if (!guestId) {
    guestId = crypto.randomUUID();
    sessionStorage.setItem("guest_id", guestId);
  }
  return guestId;
}
