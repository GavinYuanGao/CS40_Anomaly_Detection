<template>
  <div id="extendPage">
    <div id="extend-backTitleWrap" class="extend-backTitleWrap">
      <span class="extend-icon"></span>
      <span class="backTitleText">Back</span>
    </div>
    <div class="extendContainer">
      <div class="extendWrap">
        <div class="lineWrap">
          <span class="text">Rollover</span>
          <div onclick="pageFunction.showSelectItem()" id="showSelectItem" class="periodSelectWrap">
            <span class="selectValue" id="extendSelectValue"></span>
            <span class="selectDayText">days</span>
            <div class="periodSelectItemWrap" id="periodSelectItemWrap"></div>
          </div>
        </div>
        <div class="lineWrap">
          <span class="text">Repayment date</span>
          <input disabled id="extendDueDate" value=""/>
        </div>
        <div class="lineWrap">
          <span class="text">Amount due</span>
          <input disabled id="extendRepaymentAmount" value=""/>
        </div>
        <div class="lineWrap" onclick="pageFunction.showRollverFeeDetail()">
          <div class="popOverWrap" id="popOverWrap"></div>
          <div class="popBg" id="popBg"></div>
          <span class="text">Total Rollover Cost</span>
          <input id="rollverFeeInput" disabled/>
          <!--            popBg-->
          <span class="wenhao">?</span>
        </div>
        <div class="agreeWrap">
          <span class="agreeCircleBtn agreeCircleBtn-active" onclick="pageFunction.handleAgree()">✓️</span>
          <span class="agreeText">Accept Rollover Agreement</span>
        </div>
        <div class="agreeSearchWrap">
          <span onclick="pageFunction.rollverContract()" class="agreeSearch">Click to view</span>
        </div>
      </div>
    </div>
    <Button class="repaymentBtn" type="primary">
      Repay
    </Button>
  </div>
</template>

<script>
	export default {
		name: "Extend"
	}
</script>

<style scoped>

</style>