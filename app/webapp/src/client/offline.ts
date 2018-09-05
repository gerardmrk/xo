import debug from "debug";
import * as OfflinePluginRuntime from "offline-plugin/runtime";

const dbg = debug("serviceworker");

export const configureServiceWorker = (callback: ErrorFirstCallback) => {
  let retriesLeft = 3;

  OfflinePluginRuntime.install({
    onUpdating: () => {
      dbg("updating..");
      // Called when changes has been pushed to the app.
      // This will be called multiple times during hot-reload.
    },

    onUpdateReady: () => {
      dbg("update ready, manually applying update..");
      // Force the new service worker to be immediately updated.
      // This won't happen by default until all tabs of the site are closed.
      OfflinePluginRuntime.applyUpdate();
    },

    onUpdated: () => {
      dbg("successfully updated");
      // Note: successful updates will not be reflected in the app until
      // the next page refresh. Handle accordingly in the callback.
      callback(null);
      return;
    },

    onUpdateFailed: () => {
      dbg("update failed");
      // This can be retried multiple times since failure
      // to update could be caused by unstable network.

      if (retriesLeft !== 0) {
        // retry every minute until retries limit is reached.
        window.setTimeout(() => {
          dbg("retrying update..");
          retriesLeft--;
          OfflinePluginRuntime.applyUpdate();
        }, 1000 * 60);
      } else {
        callback(new Error());
        return;
      }
    }
  });
};
