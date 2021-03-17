<template>
  <div class="repaymentWrap">
    <div class="repaymentContain">
      <div id="infoPage" class="infoPage">
        <div class="appName">{{repaymentInfo.appName || 'appName'}}</div>
        <section class="headerTopWrap">
          <div v-bind:class="[loanStatus=== 'OVERDUE' ? 'dateUnitWrap_overdue' : 'dateUnitWrap']">
            <span class="header-current-day">
              {{
              typeof (repaymentInfo.remainingDays) === 'number' ?
              Math.abs(repaymentInfo.remainingDays) : repaymentInfo.remainingDays
              }}
            </span>
            <div class="header-current-unit">
              <span class="loanDes">
                {{
                loanStatus=== 'OVERDUE' ? 'días atrasados' :
                (loanStatus=== 'PAID_OFF' ? 'Asentar' : 'Número de días restantes')
                }}
              </span>
            </div>
          </div>
          <div class="repayment_wrap">
            <div class="left_item">
              <div class="val ">MXP <span class="loan_money_val_real">
                {{toThousands(repaymentInfo.remainAmount)}}
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
            <span v-bind:class="['loan_status_val',loanStatus=== 'OVERDUE' ? 'loan_status_val_overdue' : '']">
              {{loanStatus=== 'OVERDUE' ? 'Atrasado' : (loanStatus=== 'PAID_OFF' ? 'Asentar' : 'Prepárese para pagar')}}
            </span>
          </div>
          <div class="loan_days_wrap">
            <span class="loan_days_text custName">Nombre: {{repaymentInfo.custName}}</span>
            <span class="loan_username_val custMobile">Móvil: *** {{ repaymentInfo.mobile}}</span>
          </div>
        </div>
        <div class="space-20">&nbsp;</div>
        <div class="payee_information_wrap">
          <div class="title">
            Manten y cuida su crédito, evitaría un cargo extra por la demora. Le sugerimos realizar el pago con las
            siguiente cuentas:
          </div>
          <div class="payee_item_wrap">
            <div class="left_item">Institución:</div>
            <div class="right_item">STP</div>
          </div>
          <div class="payee_item_wrap">
            <div class="left_item">CLABE：</div>
            <div class="right_item">{{ paymentCode }}</div>
          </div>
          <div class="payee_item_wrap">
            <div class="left_item">Titular:</div>
            <div class="right_item">INSCASH SERVICIOS DE MEXICO, S.A. DE C.V.</div>
          </div>
          <!--    <div class="payee_item_wrap">-->
          <!--      <div class="left_item">Número de cuenta:</div>-->
          <!--      <div class="right_item">159 175 8937</div>-->
          <!--    </div>-->
          <!--    <div class="payee_item_wrap">-->
          <!--      <div class="left_item">Número de tarjeta:</div>-->
          <!--      <div class="right_item">4152 3137 1158 4768</div>-->
          <!--    </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import { createDepositVa } from "../../service/api";
  import { parseUrl, toThousands } from "../../util";
	export default {
		name: "PersonalBank",
    data: function () {
			return {
				toThousands: toThousands,
				loanStatus: 'OVERDUE',
        repaymentInfo: {},
        paymentCode: '',
      }
		},
    mounted() {
			this.repaymentInfo = JSON.parse(localStorage.getItem('repaymentInfo'))
      this.loanStatus = JSON.parse(localStorage.getItem('repaymentInfo')).status
    },
    methods: {
      getData() {
        const urlParams = parseUrl();
        const indexUrlParams = JSON.parse(localStorage.getItem('indexUrlParams'));
        this.$store.commit('showLoading')
        createDepositVa({ ...indexUrlParams, depositMethod: urlParams.method  })
          .then(res => {
            this.paymentCode = res.paymentCode
            this.$store.commit('hideLoading')
          })
        }
    },
	}
</script>

<style scoped lang="less">
@import "./personalBank";
</style>