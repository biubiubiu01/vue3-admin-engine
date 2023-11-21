export const htmlTemplate = (template?: string, script?: any, style?: any) => {
    return `
    <!DOCTYPE html>
      <html>
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
        ${script.plugin}
        ${script.customComp.script}
        <script>
          var app = new Vue({
            el: '#app',
            data(){
              return{
                ${script.data}
              }
            },
            methods:{
              ${script.methods || ""}
            }
          })
        </script>
      </body>
      </html>
    `;
};

export const vue2Template = (template?: string, script?: any, style?: any) => {
    return `
      <template>
        ${template}
      </template>

      <script>
        ${script.plugin}
        ${script.customComp.script}
         export default{
            components:{${script.customComp.componentList}},
            data(){
                return{
                   ${script.data}
                }
            },
            methods:{
              ${script.methods || ""}
            }
         }
      </script>

      <style lang="scss">
      ${style}
      </style>
    `;
};

export const vue3Template = (template?: string, script?: any, style?: any) => {
    return `
      <template>
        ${template}
      </template>

      <script lang="ts" setup>
         ${script.plugin}
         ${script.customComp.script}
         ${script.data}
         
         ${script.methods}
      </script>

      <style lang="scss">
      ${style}
      </style>
    `;
};
