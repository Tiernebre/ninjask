export const LoginForm = () => {
  return (
    <form>
      <label htmlFor="LoginForm__access-key">
        Access Key
      </label>
      <input type="text" id="LoginForm__access-key" name="accessKey" />
      <label htmlFor="LoginForm__password">
        Password
      </label>
      <input type="password" id="LoginForm__password" name="password" />
    </form>
  )
}

