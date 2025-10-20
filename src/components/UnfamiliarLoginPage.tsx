// Unfamiliar Login Page Component
// Shows login locations and diagnosed unfamiliar sign-ins over the last 3 months

import React, { useState, useEffect } from 'react';
import './UnfamiliarLoginPage.css';

interface UnfamiliarLoginPageProps {
  accessToken?: string | null;
  onClose: () => void;
}

interface LoginLocation {
  id: string;
  location: string;
  city: string;
  country: string;
  ipAddress: string;
  timestamp: string;
  isFamiliar: boolean;
}

interface DiagnosedSignIn {
  id: string;
  location: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  timestamp: string;
  details: string;
  action: string;
}

const UnfamiliarLoginPage: React.FC<UnfamiliarLoginPageProps> = ({ accessToken, onClose }) => {
  const [loginLocations, setLoginLocations] = useState<LoginLocation[]>([]);
  const [diagnosedSignIns, setDiagnosedSignIns] = useState<DiagnosedSignIn[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState<boolean>(false);

  // Mock data for demonstration - replace with actual API calls
  useEffect(() => {
    if (accessToken) {
      loadMockData();
    }
  }, [accessToken]);

  const loadMockData = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Mock login locations data
      const mockLocations: LoginLocation[] = [
        {
          id: '1',
          location: 'Copenhagen, Denmark',
          city: 'Copenhagen',
          country: 'Denmark',
          ipAddress: '192.168.1.100',
          timestamp: '2024-10-20T10:30:00Z',
          isFamiliar: true
        },
        {
          id: '2',
          location: 'Lyngby, Denmark',
          city: 'Lyngby',
          country: 'Denmark',
          ipAddress: '130.226.142.10',
          timestamp: '2024-10-19T14:22:00Z',
          isFamiliar: true
        },
        {
          id: '3',
          location: 'Stockholm, Sweden',
          city: 'Stockholm',
          country: 'Sweden',
          ipAddress: '85.224.45.120',
          timestamp: '2024-10-18T09:15:00Z',
          isFamiliar: false
        },
        {
          id: '4',
          location: 'Berlin, Germany',
          city: 'Berlin',
          country: 'Germany',
          ipAddress: '46.101.123.45',
          timestamp: '2024-10-17T16:45:00Z',
          isFamiliar: false
        }
      ];

      // Mock diagnosed sign-ins data
      const mockDiagnosed: DiagnosedSignIn[] = [
        {
          id: '1',
          location: 'Moscow, Russia',
          riskLevel: 'High',
          timestamp: '2024-10-16T03:22:00Z',
          details: 'Login attempt from unusual location with suspicious activity patterns',
          action: 'Blocked automatically'
        },
        {
          id: '2',
          location: 'Lagos, Nigeria',
          riskLevel: 'High',
          timestamp: '2024-10-15T11:30:00Z',
          details: 'Multiple failed login attempts followed by successful login',
          action: 'User notified, session terminated'
        },
        {
          id: '3',
          location: 'New York, USA',
          riskLevel: 'Medium',
          timestamp: '2024-10-14T20:18:00Z',
          details: 'Login from new device and location during unusual hours',
          action: 'Additional verification required'
        }
      ];

      setLoginLocations(mockLocations);
      setDiagnosedSignIns(mockDiagnosed);
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-DK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="unfamiliar-login-overlay">
      <div className="unfamiliar-login-container">
        {/* Header */}
        <div className="unfamiliar-login-header">
          <h2>Login Activity Analysis</h2>
          <p>Past 3 months • DTU Security Monitor</p>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* View Options */}
        <div className="view-options">
          <button 
            className={`view-button ${!showMap ? 'active' : ''}`}
            onClick={() => setShowMap(false)}
          >
            <span className="view-icon">📋</span>
            List View
          </button>
          <button 
            className={`view-button ${showMap ? 'active' : ''}`}
            onClick={() => setShowMap(true)}
          >
            <span className="view-icon">🗺️</span>
            World Map
          </button>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {isLoading ? (
            <div className="loading-state">
              <div className="loading-spinner">🔄</div>
              <p>Loading login activity data...</p>
            </div>
          ) : (
            <>
              {!showMap ? (
                /* List View */
                <div className="list-view">
                  {/* Login Locations Section */}
                  <div className="section">
                    <div className="section-header">
                      <h3>🌍 Recent Login Locations ({loginLocations.length})</h3>
                      <p>Recent login locations detected for your account. Unfamiliar locations are highlighted for your review.</p>
                    </div>
                    
                    <div className="locations-list">
                      {loginLocations.map((location) => (
                        <div 
                          key={location.id} 
                          className={`location-item ${location.isFamiliar ? 'familiar' : 'unfamiliar'}`}
                        >
                          <div className="location-header">
                            <div className="location-info">
                              <h4>{location.location}</h4>
                              <span className="location-status">
                                {location.isFamiliar ? '✅ Familiar' : '⚠️ Unfamiliar'}
                              </span>
                            </div>
                            <span className="location-time">{formatDate(location.timestamp)}</span>
                          </div>
                          
                          <div className="location-details">
                            <div className="detail-item">
                              <span className="detail-label">IP Address:</span>
                              <span className="detail-value">{location.ipAddress}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Country:</span>
                              <span className="detail-value">{location.country}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Diagnosed Threats Section */}
                  <div className="section">
                    <div className="section-header">
                      <h3>⚠️ Diagnosed Security Threats ({diagnosedSignIns.length})</h3>
                      <p>Security incidents and suspicious activities detected by our AI monitoring system.</p>
                    </div>
                    
                    <div className="diagnosed-list">
                      {diagnosedSignIns.map((signIn) => (
                        <div key={signIn.id} className="diagnosed-item">
                          <div className="diagnosed-header">
                            <div className="risk-info">
                              <h4>{signIn.location}</h4>
                              <span 
                                className="risk-badge" 
                                style={{ backgroundColor: getRiskColor(signIn.riskLevel), color: 'white' }}
                              >
                                {signIn.riskLevel} Risk
                              </span>
                            </div>
                            <span className="diagnosed-time">{formatDate(signIn.timestamp)}</span>
                          </div>
                          
                          <div className="diagnosed-details">
                            <p className="threat-description">{signIn.details}</p>
                            <div className="action-taken">
                              <span className="action-label">Action Taken:</span>
                              <span className="action-value">{signIn.action}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* World Map View */
                <div className="map-view">
                  <div className="map-container">
                    <div className="world-map">
                      <h3>🗺️ Global Login Activity Map</h3>
                      <p>Interactive visualization of login locations worldwide</p>
                      
                      <div className="map-placeholder">
                        <div className="map-info">
                          <div className="map-icon">🌍</div>
                          <h4>World Map Visualization</h4>
                          <p>This feature integrates with Google Workspace API to display login locations on an interactive world map.</p>
                          
                          <div className="location-markers">
                            {[...loginLocations.map(l => ({
                              id: l.id,
                              location: l.location,
                              country: l.country,
                              isFamiliar: l.isFamiliar,
                              riskLevel: undefined as string | undefined
                            })), ...diagnosedSignIns.map(s => ({
                              id: s.id + '_threat',
                              location: s.location,
                              country: s.location.split(', ')[1] || s.location,
                              isFamiliar: false,
                              riskLevel: s.riskLevel
                            }))].map((location) => (
                              <div key={location.id} className={`map-marker ${location.isFamiliar ? 'safe' : 'threat'}`}>
                                <div className="marker-icon">
                                  {location.isFamiliar ? '📍' : '⚠️'}
                                </div>
                                <div className="marker-info">
                                  <strong>{location.location}</strong>
                                  {location.riskLevel && <span className="risk-level">{location.riskLevel} Risk</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="integration-note">
                            <p><strong>🔗 Google Workspace Integration:</strong></p>
                            <p>To enable full map functionality, integrate with:</p>
                            <ul>
                              <li>Google Maps JavaScript API</li>
                              <li>Google Workspace Security Center API</li>
                              <li>Geolocation services for IP mapping</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="footer-actions">
          <button className="action-button secondary" onClick={onClose}>
            Close
          </button>
          <button className="action-button primary">
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnfamiliarLoginPage;