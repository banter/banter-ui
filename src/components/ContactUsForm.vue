<template>
  <div>
    <form
      name="contact-form"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      data-netlify-recaptcha="true"
    >
      <input type="hidden" name="form-name" value="contact-form">
      <div>
        <label
          for="email"
        >
          Email
        </label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          placeholder="satoshi@nakamoto.com"
          data-hj-whitelist
        >
      </div>
      <div>
        <label
          for="name"
        >
          Name
        </label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          placeholder="Satoshi Nakamoto"
          data-hj-whitelist
        >
      </div>
      <label>
        <label
          for="message"
        >
          Message
        </label>
        <textarea
          id="message"
          v-model="message"
          name="message"
          rows="3"
          placeholder="Enter your message here..."
          data-hj-whitelist
        />
      </label>

      <div>
        <button type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactUsForm',
};
</script>
