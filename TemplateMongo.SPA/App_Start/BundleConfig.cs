using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace TemplateMongo.SPA
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //BundleTable.EnableOptimizations = true;
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-flot").Include(
                "~/Scripts/Flot/jquery.flot.js"
                , "~/Scripts/Flot/jquery.flot.pie.js"
                , "~/Scripts/Flot/jquery.flot.time.js"
                , "~/Scripts/Flot/jquery.flot.stack.js"
                , "~/Scripts/Flot/jquery.flot.resize.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-flot-plugins").Include(
                 "~/Scripts/Flot/jquery.flot.orderBars.js"
                , "~/Scripts/Flot/date.js"
                , "~/Scripts/Flot/jquery.flot.spline.js"
                , "~/Scripts/Flot/curvedLines.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js"
                , "~/Scripts/bootstrap-progressbar.js"));

            bundles.Add(new ScriptBundle("~/bundles/JS").Include(
               "~/Scripts/fastclick.js"
               , "~/Scripts/nprogress.js"               
               , "~/Scripts/ocLazyLoad.js"
                , "~/Scripts/ui-bootstrap.js"));


            bundles.Add(new ScriptBundle("~/bundles/JSplugins").Include(
               "~/Scripts/moment/moment.js"
               , "~/Scripts/datepicker/daterangepicker.js"
               , "~/Scripts/jquery.inputmask.bundle.js"
               , "~/Scripts/Chart.js"
               , "~/Scripts/gauge.js"
               , "~/Scripts/icheck.js"
               , "~/Scripts/skycons/skycons.js"
               ));

            bundles.Add(new ScriptBundle("~/bundles/custom").Include(
               "~/Scripts/custom.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //    "~/Scripts/jquery.unobtrusive*",
            //    "~/Scripts/jquery.validate*"));

            //bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
            //    "~/Scripts/knockout-{version}.js",
            //    "~/Scripts/knockout.validation.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-touch.js",
                "~/Scripts/angular-aria.js",
                "~/Scripts/angular-messages.js",
                "~/Scripts/angular-ui-router.js"
                , "~/Scripts/angular-datatables.js"));

            bundles.Add(new ScriptBundle("~/bundles/controllers").Include(
                "~/Scripts/controllers/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/directives").Include(
                "~/Scripts/directives/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/services").Include(
                "~/Scripts/services/*.js"));

            bundles.Add(new ScriptBundle("~/app").Include(                
                 "~/Scripts/App.js"
                 , "~/Scripts/App.router.js"
                , "~/Scripts/App.lazyload.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatable").Include("~/Scripts/datatables.min.js"));

            bundles.Add(new StyleBundle("~/Content/bootstrap").Include("~/Content/bootstrap.css", "~/Content/daterangepicker.css"));
            bundles.Add(new StyleBundle("~/Content/fontawesome").Include("~/Content/font-awesome.css"));
            bundles.Add(new StyleBundle("~/Content/animate").Include("~/Content/animate.min.css"));
            bundles.Add(new StyleBundle("~/Content/green").Include("~/Content/iCheck/skins/flat/green.css"));
            bundles.Add(new StyleBundle("~/Content/datatable").Include("~/Content/datatables.min.css"));
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/Site.css"));
        }
    }
}
