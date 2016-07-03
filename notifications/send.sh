curl --header "Authorization: key=AIzaSyBanIGWb1NE6pSztkFEch1zDpvgELDFFJU" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"${1}\"]}"

