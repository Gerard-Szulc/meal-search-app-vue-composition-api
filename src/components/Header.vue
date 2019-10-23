<template>
    <header class="App-header">
        <h2>{{ title }}</h2>
        <div id="nav">
            <router-link to="/">Home</router-link> |
        </div>
    </header>
</template>

<script>
    export default {
        name: 'Header',
        props: ['title'],
        setup() {}
    }
</script>
