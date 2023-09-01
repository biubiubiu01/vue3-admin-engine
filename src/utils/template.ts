export const htmlTemplate = (template?: string, script?: string, style?: string) => {
    return `
    <!DOCTYPE html>
      <html class="">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
        <style>
          ${style}
        </style>
      </head>
      <body>
        <div id="app">
           ${template}
        </div>
        <script src="https://unpkg.com/vue@2.7.14/dist/vue.js"></script>
        <script src="https://unpkg.com/element-ui/lib/index.js"></script>
        <script>
          var app = new Vue({
            el: '#app',
            ${script}
          })
        </script>
      </body>
      </html>
    `;
};

export const vue2Template = (template?: string, script?: string, style?: string) => {
    return `
      <template>
        ${template}
      </template>

      <script>
         export default{
            data(){
                return{

                }
            },
            methods:{

            }
         }
      </script>

      <style lang="scss" scoped>
      </style>
    `;
};

export const vue3Template = (template?: string, script?: string, style?: string) => {
    return `
      <template>
        ${template}
      </template>

      <script lang="ts" setup>

      </script>

      <style lang="scss" scoped>
      </style>
    `;
};
