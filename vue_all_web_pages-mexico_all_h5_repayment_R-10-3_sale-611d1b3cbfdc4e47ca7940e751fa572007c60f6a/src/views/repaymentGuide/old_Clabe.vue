<template>
  <div class="blabe-wrap">
    <div class="code-wrap">
      <span class="name">Monto a pagar: </span>
      <span class="value">{{toThousands(remainAmount)}} MXN</span>
    </div>
    <div class="code-wrap">
      <span class="name">Referencia</span>
      <span class="value">{{paymentCode}}</span>
    </div>
  </div>
</template>

<script>
  import { createDepositVa } from "../../service/api";
  import { parseUrl, toThousands } from "../../util";

	export default {
		name: "OXXO_CASH",
    data: () => {
			return {
				toThousands: toThousands,
				remainAmount: '',
				paymentCode: '',
        checkoutUrl: ''
      }
    },
    mounted() {
			const urlParams = parseUrl();
			const indexUrlParams = JSON.parse(localStorage.getItem('indexUrlParams'));
			this.$store.commit('showLoading')
			createDepositVa({ ...indexUrlParams, depositMethod: urlParams.method  })
        .then(res => {
          this.remainAmount = res.price
          this.paymentCode = res.paymentCode
					this.$store.commit('hideLoading')
          this.checkoutUrl = res.checkoutUrl
				})
		}
	}
</script>

<style scoped lang="less">
@import "./clabe";
</style>
