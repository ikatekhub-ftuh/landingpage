<template>
    <Layout>
        <div v-if="dataIsLoading" class="col-span-12 grid grid-cols-12 gap-6">
            <!-- static -->
            <div class="col-span-12 lg:col-span-8 flex flex-col gap-2">
                <Skeleton width="20%" height="2rem"></Skeleton>
                <Skeleton width="100%" height="4rem"></Skeleton>
                <Skeleton width="40%" height="2rem"></Skeleton>
                <Skeleton width="100%" height="25rem"></Skeleton>
                <Skeleton width="100%" height="30rem"></Skeleton>
            </div>

            <div class="col-span-12 lg:col-span-4 flex flex-col gap-2">
                <Skeleton width="100%" height="20rem"></Skeleton>
            </div>
        </div>

        <div v-else class="col-span-12 grid grid-cols-12 gap-6">
            <div class="col-span-12 lg:col-span-8 flex flex-col gap-2">
                <p class="text-lg font-semibold text-red-600">Event</p>
                <h2 class="text-3xl font-semibold">{{konten.judul}}</h2>

                <div class="flex gap-5">
                    <div class="flex items-center gap-2">
                        <i class="pi pi-calendar"></i>
                        <p class="text-lg font-normal">{{ hitungHari(konten.created_at) }}</p>
                    </div>
                    <!-- <div class="flex items-center gap-2">
                        <i class="pi pi-user"></i>
                        <p class="text-lg font-normal">By : {{ konten.penulis }}</p>
                    </div> -->
                </div>

                <div class="flex flex-col items-center">
                    <img class="w-full pb-3" :src="this.default.img + konten.gambar" alt="">
                    <div v-html="konten.konten" class="flex flex-col gap-3 pb-3"></div>
                </div>
            </div>

            <div class="col-span-12 lg:col-span-4">
                <div v-if="otherLinksLoading" class="bg-white rounded-md p-5 flex flex-col text-left shadow-md gap-2">
                    <Skeleton width="100%" height="4rem"></Skeleton>
                    <Skeleton width="100%" height="4rem"></Skeleton>
                    <Skeleton width="100%" height="4rem"></Skeleton>
                    <Skeleton width="100%" height="4rem"></Skeleton>
                </div>
                <OtherDetail v-else :otherLinks="otherLinks" judul="Event" link="/event"></OtherDetail>
            </div>
        </div>
    </Layout>
</template>

<script>
export default {
    name: 'eventDetail',
    inject: ['default'],
    data() {
        return {
            dataIsLoading: true,
            konten: [],
            otherLinks: [],
            otherLinksLoading: true,
            pageMeta: {
                title: `ANTEK HUB |`,
                meta: [
                    { property: 'og:url',               content: `${window.location.origin}${this.$route.fullPath}` },
                    { property: 'twitter:url',          content: `${window.location.origin}${this.$route.fullPath}` },
                    { property: 'og:image',             content: `https://api.antekhub.com/storage/meta-preview.jpg` },
                    { property: 'og:image:url',         content: `https://api.antekhub.com/storage/meta-preview.jpg` },
                    { property: 'og:image:secure_url',  content: `https://api.antekhub.com/storage/meta-preview.jpg` },
                    { property: 'twitter:image',        content: 'https://api.antekhub.com/storage/meta-preview.jpg' },
                    { property: 'og:image:alt',         content: 'Gambar Preview ANTEK HUB' },
                ]
            }
        }
    },
    methods: {
        // ? Fetch data
        async getDetail() {
            await axios.get('/event/' + this.$route.params.slug).then(response => {
                this.konten = (response.data.data)
                this.dataIsLoading = false;
                this.pageMeta.title = 'ANTEK HUB | ' + this.konten.judul; 
                const imageUrl = `${this.default.img}${this.konten.gambar}`;

                this.pageMeta.meta = [
                    { property: 'og:url',               content: `${window.location.origin}${this.$route.fullPath}` },
                    { property: 'twitter:url',          content: `${window.location.origin}${this.$route.fullPath}` },
                    { property: 'og:image',             content: imageUrl },
                    { property: 'og:image:url',         content: imageUrl },
                    { property: 'og:image:secure_url',  content: imageUrl },
                    { property: 'twitter:image',        content: imageUrl },
                    { property: 'og:image:alt',         content: `${this.konten.judul}` },
                ];
            }).catch(err => {
                console.log(err)
            });
        },
        async getEvent() {
            await axios.get('event?limit=4').then(response => {
                this.otherLinks = (response.data.data.data)
                this.otherLinksLoading = false
            })
        },
        hitungHari(dateStr) {
            const date = new Date(dateStr);
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options);
        },
    },
    mounted() {
        this.getDetail(),
        this.getEvent(),
        useHead(this.pageMeta)
    },
        watch: {
        $route(to, from) {
            this.dataIsLoading = true;
            this.getDetail();
        },
    }
}
</script>

<style>

</style>