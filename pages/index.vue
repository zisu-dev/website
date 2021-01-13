<template>
  <v-container class="home">
    <v-row justify="space-around">
      <v-col cols="12">
        <v-card color="transparent" flat class="brand-card" dark>
          <div class="brand-card-wrap">
            <v-card-text class="text-h3 text-3d">
              <code>ZZisu.dev</code>
            </v-card-text>
            <v-card-text class="text-h6 pt-1 pb-1">
              <code>
                <span style="color: #2ecc71">></span>
                <span style="color: #3498db">~</span>
                <span>{{ motto }}</span>
                <span :class="{ blink: !typing }">|</span>
              </code>
            </v-card-text>
            <v-divider />
            <v-card-text class="text-center text-overline pa-1">
              <v-btn outlined small @click="scroll">
                <v-icon left>{{ mdiArrowDown }}</v-icon>
                Scroll to see more
              </v-btn>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <v-card ref="next">
          <v-card-title>Next</v-card-title>
          <v-divider />
          <v-list>
            <v-list-item v-for="(link, i) in links" :key="i" v-bind="link.link">
              <v-list-item-avatar tile size="24">
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ link.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ link.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <recent-posts />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" xl="4">
        <v-card>
          <v-card-title>Contact</v-card-title>
          <v-divider />
          <v-card-text>
            <template v-for="(s, i) in social">
              <a
                :key="i"
                :href="s.href"
                target="_blank"
                class="pr-1"
                rel="noreferrer"
              >
                <img :src="s.img" :alt="s.text" />
              </a>
            </template>
          </v-card-text>
          <v-divider />
          <v-card-text>
            <template v-for="(c, i) in contacts">
              <template v-if="c.href">
                <a
                  :key="i"
                  :href="c.href"
                  target="_blank"
                  class="pr-1"
                  rel="noreferrer"
                >
                  <img
                    :src="`https://img.shields.io/static/v1?label=&message=${c.text}&color=${c.color}&style=flat-square&logo=${c.icon}&logoColor=FFF`"
                    :alt="c.text"
                  />
                </a>
              </template>
              <template v-else>
                <img
                  :key="i"
                  :src="`https://img.shields.io/static/v1?label=${c.label}&message=${c.text}&color=${c.color}&style=flat-square&logo=${c.icon}&logoColor=FFF`"
                  :alt="c.text"
                  class="pr-1"
                />
              </template>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiFormatListText, mdiWeb, mdiArrowDown } from '@mdi/js'
import { wait } from '~/utils/misc'
import RecentPosts from '~/components/post/RecentPosts.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { RecentPosts },
  data() {
    return {
      links: [
        {
          link: { to: '/post' },
          icon: mdiFormatListText,
          title: 'Blog',
          subtitle: 'ZZisu.dev blog'
        },
        {
          link: {
            href: 'https://proxy.zhangzisu.cn/',
            target: '_blank',
            rel: 'noopener'
          },
          icon: mdiWeb,
          title: 'Proxy',
          subtitle: 'ZhangZisu.CN Proxy Services'
        }
      ],
      social: [
        {
          href: 'https://github.com/zzisu',
          img:
            'https://img.shields.io/github/followers/zzisu?label=Follow%20%40zzisu&style=social',
          text: 'GitHub'
        },
        {
          href: 'https://twitter.com/zzisu03',
          img: 'https://img.shields.io/twitter/follow/zzisu03?style=social',
          text: 'Twitter'
        }
      ],
      contacts: [
        {
          href: 'https://t.me/zhangzisu',
          color: '2CA5E0',
          icon: 'telegram',
          text: 'zhangzisu'
        },
        {
          href: 'mailto:i@zzs1.cn',
          color: 'blue',
          icon: 'gmail',
          text: 'i@zzs1.cn'
        },
        {
          href: 'https://space.bilibili.com/38430118',
          color: '00A1D6',
          icon: 'bilibili',
          text: 'ZhangZisu'
        },
        {
          href: 'https://www.zhihu.com/people/zhangzisu',
          color: '0084FF',
          icon: 'zhihu',
          text: 'zhangzisu'
        },
        {
          color: 'EB1923',
          text: '2807616946',
          label: 'QQ'
        },
        {
          text: '(86) 18067896891',
          label: 'TEL'
        }
      ],
      mottos: ['Code is philosophy', 'Decadent Evolution'],
      motto: 'Code is philosophy',
      typing: false,

      mdiArrowDown
    }
  },
  head() {
    return {
      title: 'Index'
    }
  },
  created() {
    this.$store.commit('scope:update', 'index')
  },
  mounted() {
    this.typeMottos()
  },
  methods: {
    async *mottoStream(): AsyncGenerator<string, void> {
      for (;;) {
        for (const motto of this.mottos) {
          yield motto
          await wait(10000)
        }
      }
    },
    async typeMottos() {
      const it = this.mottoStream()
      for await (const motto of it) {
        await this.typeMotto(motto)
      }
    },
    async typeMotto(str: string) {
      this.typing = true
      while (this.motto.length) {
        this.motto = this.motto.substr(0, this.motto.length - 1)
        await wait(50)
      }
      for (const c of str) {
        this.motto += c
        await wait(100)
      }
      this.typing = false
    },
    scroll() {
      this.$vuetify.goTo(this.$refs.next)
    }
  }
})
</script>

<style scoped>
.brand-card {
  height: calc(100vh - 96px);
  backdrop-filter: none;
}

.brand-card-wrap {
  background-color: #4d4d4fab;
}

.text-3d {
  text-shadow: 0px 1px 0px #c7c8ca, 0px 2px 0px #b1b3b6, 0px 3px 0px #9d9fa2,
    0px 4px 0px #8a8c8e, 0px 5px 0px #77787b, 0px 6px 0px #636466,
    0px 7px 0px #4d4d4f, 0px 8px 7px #001135;
}

.blink {
  color: #fff;
  animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
  from,
  to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>