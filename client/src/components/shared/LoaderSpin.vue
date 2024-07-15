<template>
    <div class="loader">
        <img src="/icons/loader.svg" alt="loading" />
    </div>
</template>

<style scoped lang="scss">
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.loader {
    img {
        animation-name: spin;
        animation-duration: 5000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
}
</style>
