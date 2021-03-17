<template>
  <div class="repaymentWrap">
    <div class="repaymentContain">
      <div id="infoPage" class="infoPage">
        <div class="appName">{{repaymentInfo.appName || 'appName'}}</div>
        <section class="headerTopWrap">
          <div v-bind:class="[loanStatus === 'OVERDUE' ? 'dateUnitWrap_overdue' : 'dateUnitWrap']">
            <span class="header-current-day">
              {{
              typeof (repaymentInfo.remainingDays) === 'number' ?
              Math.abs(repaymentInfo.remainingDays) : repaymentInfo.remainingDays
              }}
            </span>
            <div class="header-current-unit">
              <span class="loanDes">
                {{
                loanStatus === 'OVERDUE' ? 'días atrasados' :
                (loanStatus === 'PAID_OFF' ? 'Asentar' : 'Número de días restantes')
                }}
              </span>
            </div>
          </div>
          <div class="repayment_wrap">
            <div class="left_item">
              <div class="val ">MXN <span class="loan_money_val_real">
                {{toThousands(urlParams.amount || repaymentInfo.remainAmount)}}
              </span></div>
              <div class="des">Reembolso</div>
            </div>
            <div class="right_item">
              <div class="val loan_dueDate_val">
                {{repaymentInfo.dueDate && repaymentInfo.dueDate.substr(0, 10)}}
              </div>
              <div class="des">Fecha de vencimiento</div>
            </div>
          </div>
        </section>
        <div class="loan_detail_wrap">
          <div class="loan_days_wrap">
          <span class="loan_days_text">Período de préstamo</span>
            <span class="loan_days_val">{{repaymentInfo.period}} días</span>
          </div>
          <div class="loan_status_wrap">
            <span class="loan_status_text">Estado</span>
            <span v-bind:class="['loan_status_val',loanStatus === 'OVERDUE' ? 'loan_status_val_overdue' : '']">
              {{loanStatus === 'OVERDUE' ? 'Atrasado' : (loanStatus === 'PAID_OFF' ? 'Asentar' : 'Prepárese para pagar')}}
            </span>
          </div>
          <div class="loan_days_wrap">
            <span class="loan_days_text custName">Nombre: {{repaymentInfo.custName}}</span>
            <span class="loan_username_val custMobile">Móvil: *** {{ repaymentInfo.mobile}}</span>
          </div>
        </div>
        <div class="space-20">&nbsp;</div>

        <div class="space-20">&nbsp;</div>
        <div class="repaymentBtn"  @click="handleShowPicker">Pagar inmediatamente</div>
      <!-- todo 这里的picker并不好用，因为他的选项只是一维字符串数组，可以用 ActionSheet 动作面板代替 -->
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
              show-toolbar
              :columns="methodsList"
              @cancel="handleHidePicker"
              @confirm="onConfirm"
              confirm-button-text="Determinar"
              cancel-button-text="Cancelar"
          />
        </van-popup>
        <div class="space-20">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
	import { getLatestLoanByParams ,getMethodsV2, getLatestLoanByToken } from "../../service/api";
	import { parseUrl, toThousands } from "../../util";

	export default {
		name: "RepaymentInfo",
		data: function () {
			return {
				toThousands: toThousands,
				urlParams: parseUrl(),
				repaymentInfo: {},
        loanStatus: 'OVERDUE',
        showPicker: false,
        methodsList: [],
        methodsListObj: {}
			}
		},
		mounted() {
			const urlParams = parseUrl();
			if(!urlParams) return;
			window.localStorage.setItem('indexUrlParams', JSON.stringify(urlParams))
			this.$store.commit('showLoading')
      if(urlParams.token) {
				getLatestLoanByToken(urlParams)
					.then(res => {
						this.repaymentInfo = { ...res };
						this.loanStatus = res.status;
						localStorage.setItem('repaymentInfo', JSON.stringify({...res, remainAmount: urlParams.amount || res.remainAmount }))
						this.$store.commit('hideLoading')
					})
      } else {
				getLatestLoanByParams(urlParams)
					.then(res => {
						this.repaymentInfo = { ...res };
						this.loanStatus = res.status;
						localStorage.setItem('repaymentInfo', JSON.stringify(res))
						this.$store.commit('hideLoading')
					})
      }
			getMethodsV2()
        .then(res => {
					let list = [];
          if(res && res.length) {
						list = res.map(item => {
							if(item.method === 'OXXO_CASH') {
								this.methodsListObj['OXXO Pay'] = item
								return 'OXXO Pay';
              } else if (item.method === 'CLABE') {
								this.methodsListObj['Transferencia SPEI'] = item
								return 'Transferencia SPEI';
              }
              else {
								this.methodsListObj[item.method] = item
								return item.method;
              }
            })
          }
					this.methodsList = [...list];
				})
		},
		methods: {
			onConfirm(value) {
				this.showPicker = false;
				const { method, channel } = this.methodsListObj[value];
				// tips 命名路由跳转
        // https://router.vuejs.org/zh/guide/essentials/navigation.html
				if(method.toLowerCase() === 'OXXO_CASH'.toLowerCase()) {
					this.$router.push({ path: 'oxxo_cash', query: { method, channel } })
				} else if(method.toLowerCase() === 'CLABE'.toLowerCase()) {
          this.$router.push({ path: 'clabe', query: { method, channel } })
        } else {
					this.$router.push({ path: 'personalBank', query: { method, channel } })
				}
			},
			handleShowPicker() {
				this.showPicker = true;
      },
			handleHidePicker() {
				this.showPicker = false;
			}
    }
	}
</script>

<style lang="less" scoped>
  @import "./index";
</style>
