import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always required
    functional: true,
    analytics: true,
    marketing: false
  });

  useEffect(() => {
    // For testing purposes, uncomment the line below
    // localStorage.removeItem('cookieConsent');

    try {
      // Check if user has already accepted cookies
      const hasAcceptedCookies = localStorage.getItem('cookieConsent');

      // If not, show the cookie consent banner
      if (!hasAcceptedCookies) {
        // Small delay to prevent the banner from appearing immediately on page load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
      } else {
        // If user has preferences, load them
        try {
          const savedPreferences = JSON.parse(localStorage.getItem('cookiePreferences'));
          if (savedPreferences) {
            setCookiePreferences(savedPreferences);
          }
        } catch (e) {
          console.error('Error parsing saved cookie preferences:', e);
        }
      }
    } catch (error) {
      // In case of any localStorage errors, show the banner anyway
      console.error('Error accessing localStorage:', error);
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Save user consent in localStorage
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setIsVisible(false);
  };

  const handleManagePreferences = () => {
    // Open the preferences modal
    setIsPreferencesOpen(true);
  };


  const handleSavePreferences = () => {
    // Save the user's preferences
    localStorage.setItem('cookieConsent', 'preferences_set');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setIsPreferencesOpen(false);
    setIsVisible(false);
  };

  const handlePreferenceChange = (type) => {
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleReject = () => {
    // Save minimal consent in localStorage (only necessary cookies)
    const minimalPreferences = {
      ...cookiePreferences,
      functional: false,
      analytics: false,
      marketing: false
    };
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookiePreferences', JSON.stringify(minimalPreferences));
    setCookiePreferences(minimalPreferences);
    setIsVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <Motion.div
            className="fixed bottom-0 left-0 right-0 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="cky-consent-bar" data-cky-tag="notice">
              <div className="cky-notice">
                <p className="cky-title" aria-level="1" data-cky-tag="title" role="heading" style={{ color: '#212121' }}>
                  We value your privacy
                </p>
                <div className="cky-notice-group">
                  <div className="cky-notice-des" data-cky-tag="description" style={{ color: '#212121' }}>
                    <p>We use cookies to enhance your browsing experience, analyze our traffic, and serve personalized ads or content. By clicking "Accept All", you consent to our use of cookies.</p>
                  </div>
                  <div className="cky-notice-btn-wrapper" data-cky-tag="notice-buttons">
                    <button
                      className="cky-btn cky-btn-customize"
                      aria-label="Customize"
                      data-cky-tag="settings-button"
                      onClick={handleManagePreferences}
                    >
                      Customize
                    </button>
                    <button
                      className="cky-btn cky-btn-reject"
                      aria-label="Reject All"
                      data-cky-tag="reject-button"
                      onClick={handleReject}
                    >
                      Reject All
                    </button>
                    <button
                      className="cky-btn cky-btn-accept"
                      aria-label="Accept All"
                      data-cky-tag="accept-button"
                      onClick={handleAccept}
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isPreferencesOpen} onOpenChange={setIsPreferencesOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Customize your cookie preferences. Some cookies are necessary for the website to function properly.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox id="necessary" checked disabled />
              <div className="grid gap-1.5">
                <Label htmlFor="necessary" className="font-medium">
                  Necessary Cookies
                </Label>
                <p className="text-sm text-gray-500">
                  These cookies are essential for the website to function properly and cannot be disabled.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="functional"
                checked={cookiePreferences.functional}
                onCheckedChange={() => handlePreferenceChange('functional')}
              />
              <div className="grid gap-1.5">
                <Label htmlFor="functional" className="font-medium">
                  Functional Cookies
                </Label>
                <p className="text-sm text-gray-500">
                  These cookies enable personalized features and functionality.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="analytics"
                checked={cookiePreferences.analytics}
                onCheckedChange={() => handlePreferenceChange('analytics')}
              />
              <div className="grid gap-1.5">
                <Label htmlFor="analytics" className="font-medium">
                  Analytics Cookies
                </Label>
                <p className="text-sm text-gray-500">
                  These cookies help us understand how visitors interact with our website.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="marketing"
                checked={cookiePreferences.marketing}
                onCheckedChange={() => handlePreferenceChange('marketing')}
              />
              <div className="grid gap-1.5">
                <Label htmlFor="marketing" className="font-medium">
                  Marketing Cookies
                </Label>
                <p className="text-sm text-gray-500">
                  These cookies are used to track visitors across websites to display relevant advertisements.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <button
              className="cky-btn cky-btn-reject"
              onClick={() => setIsPreferencesOpen(false)}
            >
              Cancel
            </button>
            <button
              className="cky-btn cky-btn-accept"
              onClick={handleSavePreferences}
            >
              Save Preferences
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
