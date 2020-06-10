<template>
  <div id="app">
    <b-navbar>
      <b-navbar-brand>
        <router-link :to="'/'">
           <b-img height="60" :src="require('./assets/logo.png')" alt="Banter Logo"></b-img>
        </router-link>
      </b-navbar-brand>
      <b-navbar-nav :style="{margin: 'auto'}" class="nav-search-form" align="center">
        <b-nav-form>
          <b-input-group id="nav-search-group" size="lg">
          <b-input-group-prepend>
            <b-icon id="nav-search-icon" font-scale="2" icon="search"/>
          </b-input-group-prepend>
          <b-form-input id="nav-search-input" class="mr-sm-2 shadow-none" type="search" placeholder="Search"></b-form-input>
          </b-input-group>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav class="align-ml">
        <b-button size="sm" id="nav-signup" type="submit"><p id="nav-signup-text">Sign Up</p></b-button>
      </b-navbar-nav>
    </b-navbar>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch("fetchTopics");
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav-search-group {
  padding: 0px 6px;
  background: rgba(129, 134, 140, 0.25);
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#nav-search-group:focus {
  box-shadow: inset 0 -2px 0 #2196F3
}

#nav-search-icon {
  margin: auto;
  opacity: .4;
}

#nav-search-input {
  border: 0;
  background: none;
  width: 525px;
}

@media only screen and (max-width: 1200px) {
  #nav-search-input {
    width: 325px;
  }
}

#nav-signup {
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 5px;
  background: none;
  color: black;
}

#nav-signup:hover {
  color: white;
  background: black;
}

#nav-signup-text {
  height: 25px;
  left: 17px;
  right: 15.9px;
  top: calc(50% - 25px/2 + 0.31px);

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;

  display: flex;
  align-items: center;
  text-align: center;
  margin: 7px 20px;
}
</style>
